import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Auth.css";
import { Link, useLocation } from "react-router-dom";
import { Google } from "@mui/icons-material";
import AuthForm from "../../components/auth/AuthForm";
import SubmitButton from "../../components/buttons/SubmitButton";
const GOOGLE_CALLBACK_URL = import.meta.env.VITE_GOOGLE_CALLBACK_URL;
const Auth = () => {
    const location = useLocation();
    const page = location.pathname.split("/")[1];
    const handleGoogle = () => {
        window.open(GOOGLE_CALLBACK_URL, "_self");
    };
    return (_jsx("main", { id: "auth-main", className: "center", children: _jsxs("div", { id: "auth-wrapper", className: "flex column", children: [_jsxs("div", { children: [_jsxs("div", { className: "center", children: [_jsx(Link, { className: `tab-link center ${page === "login" ? " active-tab" : ""}`, title: "Login", to: "/login", children: "Login" }), _jsx(Link, { className: `tab-link center ${page === "register" ? " active-tab" : ""}`, title: "Register", to: "/register", children: "Register" })] }), _jsx("span", { className: `flex glider ${page === "register" ? "glider-right" : ""}` })] }), _jsxs("div", { id: "form-container", className: "align-center full flex column", children: [_jsx(AuthForm, { page: page }), _jsx("span", { className: "auth-span", children: "Or" }), _jsxs(SubmitButton, { id: "google-button", onClick: handleGoogle, children: [_jsx("span", { id: "google-icon", className: "center", children: _jsx(Google, {}) }), _jsx("span", { className: "text-overflow", children: "Continue with Google" })] })] })] }) }));
};
export default Auth;
