import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const axiosBaseInstance = axios.create({
  baseURL: API_URL,
});

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const getAuthInstance = async () => {
  let token = null;

  const firstLogin = localStorage.getItem("firstLogin");
  if (!firstLogin) return;
  try {
    const res = await axiosInstance.post("/api/auth/refresh_token", null);
    token = res.data.accessToken;
  } catch (err: any) {
    err.response.status === 400 && localStorage.removeItem("firstLogin");
    return;
  }

  const authInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { Authorization: token },
  });

  return authInstance;
};

export { axiosBaseInstance, axiosInstance, getAuthInstance };
