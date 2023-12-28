import { useState, FormEvent, ChangeEvent } from "react";
import { InputLabel, Input } from "@mui/material";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { axiosInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import { ButtonProgress } from "../../components/loading/Loading";
import "./styles.css";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const isOnline = useNetworkStatus();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOnline) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/forgot-password", {
        email,
      });
      dispatch({ type: "SUCCESS", payload: res.data });
    } catch (err: any) {
      err.response.data &&
        dispatch({ type: "ERROR", payload: err.response.data });
    }
    setLoading(false);
  };

  const handleInputChange = (e: ChangeEvent) => {
    let value = (e.target as HTMLInputElement).value;
    setEmail(value);
  };

  return (
    <Layout>
      <main className="frp center">
        <form className="center column" onSubmit={handleFormSubmit}>
          <InputLabel className="frp-input" htmlFor="email">
            Email:
          </InputLabel>
          <Input
            id="email"
            className="frp-input"
            type="email"
            onChange={handleInputChange}
            name="email"
            value={email}
            required
            autoFocus
          />
          <button
            className="submit-button frp-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? <ButtonProgress /> : "Get Reset Link"}
          </button>
        </form>
      </main>
    </Layout>
  );
};

export default ForgotPassword;
