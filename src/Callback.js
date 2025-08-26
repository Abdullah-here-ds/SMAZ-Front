import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.localStorage.setItem("token", token);
      window.location.hash = "";
    }

    // redirect to dashboard or homepage after login
    navigate("/dashboard");
  }, [navigate]);

  return <p>Logging you in with Spotify...</p>;
}

export default Callback;
