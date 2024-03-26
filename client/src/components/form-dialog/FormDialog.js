import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./FormDialog.css";
import { CloseOutlined } from "@mui/icons-material";
import Modal from "../modal/Modal";
const FormDialog = ({ handleSubmit, handleClose, children, Icon, legend, }) => {
    return (_jsx(Modal, { handleClose: handleClose, children: _jsxs("form", { className: "dialog-form center column", onSubmit: handleSubmit, children: [_jsxs("div", { className: "flex dialog-form-top", children: [_jsxs("span", { className: "flex dialog-legend-container", children: [_jsx("span", { className: "center legend-icon", children: Icon }), _jsx("legend", { className: "bolder", children: legend })] }), _jsx("button", { className: "icon", onClick: handleClose, children: _jsx(CloseOutlined, {}) })] }), _jsx("div", { className: "center column dialog-values", children: children })] }) }));
};
export default FormDialog;
