import axios from "axios";

// const baseURL = "https://sw.cyclic.app";
// const API_URL = process.env.REACT_APP_API_URL;

const baseURL = 'http://localhost:3000'

const axiosBaseInstance = axios.create({
  baseURL: baseURL,
});

const axiosInstance = axios.create({
  baseURL: baseURL,
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
    baseURL: baseURL,
    withCredentials: true,
    headers: { Authorization: token },
  });

  return authInstance;
};

export { axiosBaseInstance, axiosInstance, getAuthInstance };
