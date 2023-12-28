import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputLabel, InputAdornment, Input, IconButton } from "@mui/material";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import { axiosInstance } from "../../utils/axiosInstance";
import { ButtonProgress } from "../loading/Loading";

type Props = {
  page: string;
};

const AuthForm = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();
  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    let name = target.name;
    let value = name === "email" ? target.value.toLowerCase() : target.value;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOnline) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/auth/${page}`, {
        email,
        password,
      });
      dispatch({ type: "IS_LOGGED", payload: true });
      dispatch({ type: "SUCCESS", payload: res.data });
      localStorage.setItem("firstLogin", "true");
      navigate("/");
    } catch (err: any) {
      setLoading(false);
      err.response.data &&
        dispatch({ type: "ERROR", payload: err.response.data });
    }
    setLoading(false);
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
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {page === "login" && (
        <Link className="flex" id="forgot-password" to="/forgot-password">
          Forgot Password?
        </Link>
      )}
      <button
        className="submit-button auth-button"
        type="submit"
        disabled={loading}
      >
        {loading ? <ButtonProgress /> : page === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
