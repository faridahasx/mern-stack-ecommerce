import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ErrorIcon from "@mui/icons-material/Error";
import SignalWifiStatusbarConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4";
import "./styles.css";
const Error = ({ heading = "Something went wrong" }) => {
    return (
    //
    _jsxs("div", { className: "center", "aria-errormessage": "error-heading", children: [heading == "Network Error" ? (_jsx(SignalWifiStatusbarConnectedNoInternet4Icon, { sx: { fontSize: 40 } })) : (_jsx(ErrorIcon, { sx: { fontSize: 40 } })), _jsx("h1", { id: "error-heading", children: heading })] }));
};
export default Error;
