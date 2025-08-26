require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// MongoDB User model
const User = require("./models/user");

const app = express();

// ---------- Config ----------

const {
  PORT = 5000,
  NODE_ENV = "development",
  FRONTEND_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  MONGO_URI,
  JWT_SECRET,
} = process.env;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REDIRECT_URI || !FRONTEND_URL || !MONGO_URI || !JWT_SECRET) {
  console.error("Missing env variables. Check .env");
  process.exit(1);
}

const IS_PROD = NODE_ENV === "production";

// ---------- Middleware ----------
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// ---------- Helpers ----------
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
];

function generateRandomString(len = 16) {
  return crypto.randomBytes(len).toString("hex");
}

function setAuthCookies(res, { access_token, refresh_token, expires_in }) {
  res.cookie("sp_access", access_token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    maxAge: (expires_in || 3600) * 1000,
  });

  if (refresh_token) {
    res.cookie("sp_refresh", refresh_token, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  }
}

// ---------- MongoDB Connection ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ---------- Auth Routes ----------

// User Registration
app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    setAuthCookies(res, { access_token: token, refresh_token: "", expires_in: 3600 });
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// User Login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    setAuthCookies(res, { access_token: token, refresh_token: "", expires_in: 3600 });
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// ---------- Spotify Auth Routes ----------

// Start Spotify Login
app.get("/auth/login", (req, res) => {
  const state = generateRandomString(8);
  res.cookie("sp_state", state, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    maxAge: 10 * 60 * 1000, // 10 minutes
  });

  const params = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: SCOPES.join(" "),
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state,
    show_dialog: "true",
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

// Spotify Callback
app.get("/auth/callback", async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies["sp_state"];

  if (!state || state !== storedState) {
    return res.redirect(`${FRONTEND_URL}/login?error=state_mismatch`);
  }
  res.clearCookie("sp_state");

  try {
    const tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, expires_in } = tokenRes.data;
    setAuthCookies(res, { access_token, refresh_token, expires_in });

    return res.redirect(`${FRONTEND_URL}/dashboard`);
  } catch (err) {
    console.error("Token exchange failed:", err?.response?.data || err.message);
    return res.redirect(`${FRONTEND_URL}/login?error=token_exchange_failed`);
  }
});

// Refresh Access Token
app.post("/auth/refresh", async (req, res) => {
  const refresh_token = req.cookies["sp_refresh"];
  if (!refresh_token) return res.status(401).json({ error: "no_refresh_token" });

  try {
    const tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, expires_in, refresh_token: maybeNewRefresh } = tokenRes.data;
    setAuthCookies(res, { access_token, refresh_token: maybeNewRefresh || undefined, expires_in });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Refresh failed:", err?.response?.data || err.message);
    return res.status(401).json({ error: "refresh_failed" });
  }
});

// Logout
app.post("/auth/logout", (req, res) => {
  res.clearCookie("sp_access");
  res.clearCookie("sp_refresh");
  res.status(204).end();
});

// Auth Status
app.get("/auth/status", (req, res) => {
  const hasAccess = Boolean(req.cookies["sp_access"]);
  const hasRefresh = Boolean(req.cookies["sp_refresh"]);
  res.json({ authenticated: hasAccess || hasRefresh });
});

// ---------- Spotify Proxy API ----------
async function spotifyGet(req, res, url) {
  try {
    let access = req.cookies["sp_access"];

    if (!access && req.cookies["sp_refresh"]) {
      const r = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: req.cookies["sp_refresh"],
          client_id: SPOTIFY_CLIENT_ID,
          client_secret: SPOTIFY_CLIENT_SECRET,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const { access_token, expires_in, refresh_token } = r.data;
      setAuthCookies(res, { access_token, refresh_token: refresh_token || undefined, expires_in });
      access = access_token;
    }

    if (!access) return res.status(401).json({ error: "not_authenticated" });

    const sres = await axios.get(url, {
      headers: { Authorization: `Bearer ${access}` },
    });
    return res.json(sres.data);
  } catch (err) {
    const status = err?.response?.status || 500;
    return res.status(status).json(err?.response?.data || { error: "spotify_error" });
  }
}

app.get("/api/spotify/me", (req, res) => spotifyGet(req, res, "https://api.spotify.com/v1/me"));
app.get("/api/spotify/top", (req, res) => {
  const type = ["artists", "tracks"].includes(req.query.type) ? req.query.type : "tracks";
  const range = ["short_term", "medium_term", "long_term"].includes(req.query.range) ? req.query.range : "medium_term";
  const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 50);
  const url = `https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=${limit}`;
  return spotifyGet(req, res, url);
});

// Health check
app.get("/", (req, res) => res.send("Spotify backend running"));

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Frontend expected at ${FRONTEND_URL}`);
});
