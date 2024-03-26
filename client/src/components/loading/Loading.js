import { jsx as _jsx } from "react/jsx-runtime";
import "./Loading.css";
import { CircularProgress, LinearProgress } from "@mui/material";
const Transition = () => {
    return (_jsx("div", { className: "transition", children: _jsx(LinearProgress, {}) }));
};
const ButtonProgress = () => {
    return _jsx(CircularProgress, { sx: { color: "white" }, className: "btn-progress" });
};
export { Transition, ButtonProgress };
