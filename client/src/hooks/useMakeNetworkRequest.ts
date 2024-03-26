import { useState } from "react";
import useNetworkStatus from "./useNetworkStatus";
import { useAppDispatch } from "./useStoreTypes";
import useClearCredentials from "./useClearCredentials";

const useMakeNetworkRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isOnline = useNetworkStatus();
  const dispatch = useAppDispatch();
  const clearCredentials = useClearCredentials();

  const executeServerRequest = async (
    callback: Function,
    callbackArgs: [] = [],
    displayFallbackError: Boolean = true,
    successMessage?: string,
    defaultErrorMessage: string = "Something went wrong"
  ) => {
    if (!isOnline) {
      dispatch({ type: "ERROR", payload: "Please check your internet" });
      return;
    }
    try {
      error && setError(false);
      setLoading(true);
      await callback(...callbackArgs);
      successMessage && dispatch({ type: "SUCCESS", payload: successMessage });
    } catch (err: any) {
      setError(true);
      if (err.response) {
        // if unauthorized
        if (err.response.status === 401) {
          // Clear credentials and dispatch an alert
          clearCredentials();
          dispatch({
            type: "ERROR",
            payload: "Please Login",
          });
        } else if (typeof err.response.data === "string") {
          // Dispatch the error message if it's a string
          dispatch({ type: "ERROR", payload: err.response.data });
        } else {
          displayFallbackError &&
            dispatch({ type: "ERROR", payload: defaultErrorMessage });
        }
      } else {
        // Dispatch a generic error for other types of errors
        displayFallbackError &&
          dispatch({ type: "ERROR", payload: defaultErrorMessage });
      }
    }

    setLoading(false);
  };

  return { executeServerRequest, loading, error, isOnline };
};

export default useMakeNetworkRequest;
