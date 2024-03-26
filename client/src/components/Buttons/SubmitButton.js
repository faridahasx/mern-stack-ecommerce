import { jsx as _jsx } from "react/jsx-runtime";
import "./styles.css";
const SubmitButton = ({ children, className, ...buttonProps }) => {
    return (_jsx("button", { className: `submit-button ${className}`, ...buttonProps, children: children }));
};
export default SubmitButton;
