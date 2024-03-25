import "./Alert.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreTypes";
// MUI Components
import ErrorIcon from "@mui/icons-material/Error";

const Alert = () => {
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  const { error, success } = alert;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: "ERROR", payload: "" });
      }, 4000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: "SUCCESS", payload: "" });
      }, 3000);
    }
  }, [success, dispatch]);

  return (
    <>
      {(error || success) && (
        <div className="alert-container">
          {error && (
            <div className="center error">
              <ErrorIcon />
              <span className="center">{error}</span>
            </div>
          )}
          {success && (
            <div className="center success">
              <span className="center">{success}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Alert;
