import { axiosInstance } from "../utils/axiosInstance";
import useClearCredentials from "./useClearCredentials";
import { useAppDispatch } from "./useStoreTypes";

const useGetUserCredentials = () => {
  const dispatch = useAppDispatch();
  const clearCredentials = useClearCredentials();

  const getCredentials = async () => {
    try {
      const res = await axiosInstance.get("/api/user/info");
      dispatch({ type: "IS_ADMIN", payload: res.data.isAdmin });
      dispatch({ type: "IS_LOGGED", payload: true });
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        clearCredentials();
      }
    }
  };

  return getCredentials;
};

export default useGetUserCredentials;
