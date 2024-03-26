import { jsx as _jsx } from "react/jsx-runtime";
import SubmitButton from "./SubmitButton";
const ClearButton = ({ children, className, ...buttonProps }) => {
    return (_jsx(SubmitButton, { className: "clear-button", ...buttonProps, children: children }));
};
export default ClearButton;
