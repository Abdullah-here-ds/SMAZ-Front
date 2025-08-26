# Spotify Backend (127.0.0.1, Secure Cookies, Refresh Tokens)

Fully functional Node/Express backend for Spotify Authorization Code flow, using **httpOnly cookies** (no tokens in URLs) and backend proxy endpoints.

## Prerequisites
- Spotify Developer App (Client ID/Secret)
- React app running at `http://127.0.0.1:3000`

## Configure Spotify Redirect URI
In the Spotify developer dashboard, add this exact URI:
```
http://127.0.0.1:5000/auth/callback
```

## Setup
```bash
npm install
cp .env.example .env  # fill values
npm run dev
```

### .env fields
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://127.0.0.1:3000
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REDIRECT_URI=http://127.0.0.1:5000/auth/callback
```

## Auth Flow
1. Frontend button → `GET /auth/login`
2. Spotify → redirects to `/auth/callback?code=...&state=...`
3. Backend exchanges code for tokens and sets **httpOnly cookies**
4. Backend redirects user to your React app `/dashboard`
5. Frontend calls backend proxy endpoints with `credentials: "include"`

## Routes
- `GET /auth/login` → Redirects to Spotify authorization
- `GET /auth/callback` → Exchanges code, sets cookies, redirects to `FRONTEND_URL/d
ashboard`
- `POST /auth/refresh` → Refresh access token
- `POST /auth/logout` → Clear cookies
- `GET /auth/status` → `{ authenticated: boolean }`
- `GET /api/spotify/me` → Spotify profile via backend
- `GET /api/spotify/top?type=tracks|artists&range=short_term|medium_term|long_term&limit=20`

## Frontend usage
Button:
```jsx
<a href={"http://127.0.0.1:5000/auth/login"}>
  <button>🎵 Continue with Spotify</button>
</a>
```

Requests (include cookies):
```js
fetch("http://127.0.0.1:5000/api/spotify/me", { credentials: "include" })
  .then(r => r.json()).then(console.log);
```

Auto-refresh pattern on 401:
```js
async function apiWithAutoRefresh(path) {
  const base = "http://127.0.0.1:5000";
  let r = await fetch(base + path, { credentials: "include" });
  if (r.status === 401) {
    const rf = await fetch(base + "/auth/refresh", { method: "POST", credentials: "include" });
    if (rf.ok) r = await fetch(base + path, { credentials: "include" });
  }
  return r;
}
```

## Production Notes
- Serve via HTTPS; set cookies `secure: true`
- Consider storing refresh tokens in your DB and mapping to your own user IDs
- Add rate limiting/logging
