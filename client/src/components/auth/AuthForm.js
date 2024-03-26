import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./AuthForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputLabel, InputAdornment, Input, IconButton } from "@mui/material";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import { axiosInstance } from "../../utils/axiosInstance";
import { ButtonProgress } from "../Loading/Loading";
import SubmitButton from "../Buttons/SubmitButton";
const AuthForm = ({ page }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" });
    const { email, password } = user;
    const { executeServerRequest, loading } = useMakeNetworkRequest();
    const handleInputChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = name === "email" ? target.value.toLowerCase() : target.value;
        setUser({ ...user, [name]: value });
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        executeServerRequest(async () => {
            await axiosInstance.post(`/api/auth/${page}`, {
                email,
                password,
            });
            dispatch({ type: "IS_LOGGED", payload: true });
            localStorage.setItem("firstLogin", "true");
            navigate("/");
        });
    };
    return (_jsxs("form", { id: "auth-form", className: "flex column", onSubmit: handleFormSubmit, children: [_jsx(InputLabel, { className: "auth-label flex", htmlFor: "email", children: "Email:" }), _jsx(Input, { id: "email", className: "auth-input", type: "email", onChange: handleInputChange, name: "email", value: email }), _jsx(InputLabel, { className: "auth-label flex", children: "Password:" }), _jsx(Input, { id: "password", className: "auth-input", type: showPassword ? "text" : "password", onChange: handleInputChange, name: "password", value: password, required: true, endAdornment: _jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: () => {
                            setShowPassword(!showPassword);
                        }, children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) }) }), _jsx(SubmitButton, { type: "submit", disabled: loading, children: loading ? _jsx(ButtonProgress, {}) : page === "login" ? "Login" : "Register" })] }));
};
export default AuthForm;
