import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsx(_Fragment, { children: (error || success) && (_jsxs("div", { className: "alert-container", children: [error && (_jsxs("div", { className: "center error", children: [_jsx(ErrorIcon, {}), _jsx("span", { className: "center", children: error })] })), success && (_jsx("div", { className: "center success", children: _jsx("span", { className: "center", children: success }) }))] })) }));
};
export default Alert;
