import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputLabel, InputAdornment, Input, IconButton } from "@mui/material";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import { axiosInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import { ButtonProgress } from "../../components/loading/Loading";
import "./styles.css";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOnline) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/api/auth/reset-password/${token}`,
        { password }
      );
      navigate("/");
      dispatch({ type: "SUCCESS", payload: res.data });
    } catch (err: any) {
      err.response.data &&
        dispatch({ type: "ERROR", payload: err.response.data });
    }
    setLoading(false);
  };

  const handleInputChange = (e: ChangeEvent) => {
    let value = (e.target as HTMLInputElement).value;
    setPassword(value);
  };

  return (
    <Layout>
      <main className="frp center">
        <form className="center column" onSubmit={handleFormSubmit}>
          <InputLabel className="frp-input" htmlFor="password">
            New Password:
          </InputLabel>
          <Input
            id="password"
            className="frp-input center"
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            name="password"
            value={password}
            required
            autoFocus
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
          <button
            className="submit-button frp-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? <ButtonProgress /> : "Reset Password"}
          </button>
        </form>
      </main>
    </Layout>
  );
};

export default ResetPassword;
