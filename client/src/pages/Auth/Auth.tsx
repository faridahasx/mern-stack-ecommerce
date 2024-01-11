import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Google } from "@mui/icons-material";
import useWindowSize from "../../hooks/useWindowSize";
import AuthForm from "../../components/auth/AuthForm";
import "./styles.css";

const GOOGLE_CALLBACK_URL = import.meta.env.VITE_GOOGLE_CALLBACK_URL;


const Auth = () => {
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const dimensions = useWindowSize();

  useEffect(() => {
    let root = document.querySelector(":root");
    (root as HTMLElement).style.setProperty(
      "--vh",
      window.innerHeight / 100 + "px"
    );
  }, [dimensions]);

  const handleGoogle = () => {
    window.open(GOOGLE_CALLBACK_URL, "_self");
  };

  return (
    <main id="auth-main" className="center">
      <div id="auth-wrapper" className="flex column">
        <div>
          <div className="center">
            <Link
              className={`tab-link center ${
                page === "login" ? " active-tab" : ""
              }`}
              title="Login"
              to="/login"
            >
              Login
            </Link>
            <Link
              className={`tab-link center ${
                page === "register" ? " active-tab" : ""
              }`}
              title="Register"
              to="/register"
            >
              Register
            </Link>
          </div>
          <span
            className={`flex glider ${page === "register" && "glider-right"}`}
          ></span>
        </div>
        <div id="form-container" className="align-center full flex column">
          <AuthForm page={page} />
          <span className="auth-span">Or</span>
          <button
            id="google-button"
            className="auth-button"
            onClick={handleGoogle}
          >
            <span id="google-icon" className="center">
              <Google />
            </span>
            <span className="text-overflow">Continue with Google</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Auth;
