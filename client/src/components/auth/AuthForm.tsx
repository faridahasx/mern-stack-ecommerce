import "./AuthForm.css";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputLabel, InputAdornment, Input, IconButton } from "@mui/material";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import { axiosInstance } from "../../utils/axiosInstance";
import { ButtonProgress } from "../Loading/Loading";
import SubmitButton from "../Buttons/SubmitButton";

type Props = {
  page: string;
};

const AuthForm = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;
  const { executeServerRequest, loading } = useMakeNetworkRequest();

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    let name = target.name;
    let value = name === "email" ? target.value.toLowerCase() : target.value;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <form id="auth-form" className="flex column" onSubmit={handleFormSubmit}>
      <InputLabel className="auth-label flex" htmlFor="email">
        Email:
      </InputLabel>
      <Input
        id="email"
        className="auth-input"
        type="email"
        onChange={handleInputChange}
        name="email"
        value={email}
      />
      <InputLabel className="auth-label flex">Password:</InputLabel>
      <Input
        id="password"
        className="auth-input"
        type={showPassword ? "text" : "password"}
        onChange={handleInputChange}
        name="password"
        value={password}
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <SubmitButton type="submit" disabled={loading}>
        {loading ? <ButtonProgress /> : page === "login" ? "Login" : "Register"}
      </SubmitButton>
    </form>
  );
};

export default AuthForm;
