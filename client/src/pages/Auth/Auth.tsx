import "./Auth.css";
import { Link, useLocation } from "react-router-dom";
import { Google } from "@mui/icons-material";
import AuthForm from "../../components/Auth/AuthForm";
import SubmitButton from "../../components/Buttons/SubmitButton";

const GOOGLE_CALLBACK_URL = import.meta.env.VITE_GOOGLE_CALLBACK_URL;

const Auth = () => {
  const location = useLocation();
  const page = location.pathname.split("/")[1];
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
            className={`flex glider ${
              page === "register" ? "glider-right" : ""
            }`}
          ></span>
        </div>
        <div id="form-container" className="align-center full flex column">
          <AuthForm page={page} />
          <span className="auth-span">Or</span>
          <SubmitButton id="google-button" onClick={handleGoogle}>
            <span id="google-icon" className="center">
              <Google />
            </span>
            <span className="text-overflow">Continue with Google</span>
          </SubmitButton>
        </div>
      </div>
    </main>
  );
};

export default Auth;
