// External imports
import { useAppDispatch } from "./useStoreTypes";

// Custom React hook to clea user credentials
const useClearCredentials = () => {
  // Get the dispatch function from the Redux store
  const dispatch = useAppDispatch();
  // Return a function to clear credentials and update Redux state
  return () => {
    localStorage.removeItem("firstLogin");
    dispatch({ type: "IS_LOGGED", payload: false });
    dispatch({ type: "IS_ADMIN", payload: false });
    console.log("RUN");
  };
};

// Export the custom hook for use in other components
export default useClearCredentials;
