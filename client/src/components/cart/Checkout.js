import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from "../Modal/Modal";
import "./Checkout.css";
const Checkout = ({ handleClose }) => {
    return (_jsx(Modal, { handleClose: handleClose, children: _jsxs("div", { id: "checkout-wrapper", className: "shadow", children: [_jsx("h2", { children: "This website isn't taking orders right now." }), _jsx("div", { className: "flex", children: _jsx("button", { className: "bolder", onClick: () => handleClose(), children: "OKAY" }) })] }) }));
};
export default Checkout;
