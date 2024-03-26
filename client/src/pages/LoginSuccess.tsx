import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useStoreTypes";
import { Transition } from "../components/loading/Loading";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("firstLogin", "true");
    dispatch({ type: "IS_LOGGED", payload: true });
    dispatch({ type: "SUCCESS", payload: "Login Success!" });
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Transition />
    </div>
  );
};

export default LoginSuccess;
