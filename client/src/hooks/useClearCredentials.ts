// External imports
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./useStoreTypes";

// Custom React hook to clear credentials and update Redux state
const useClearCredentials = () => {
  // Get the dispatch function from the Redux store
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Return a function to clear credentials and update Redux state
  return () => {
    localStorage.removeItem("firstLogin");
    dispatch({ type: "IS_LOGGED", payload: false });
    dispatch({ type: "IS_ADMIN", payload: false });
    navigate("/");
    dispatch({ type: "SUCCESS", payload: "Logged Out" });
  };
};

// Export the custom hook for use in other components
export default useClearCredentials;
