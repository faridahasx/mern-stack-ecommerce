import { jsx as _jsx } from "react/jsx-runtime";
import useKeyDownListener from "../../hooks/useKeydownListener";
import "./Modal.css";
import { useEffect } from "react";
const Modal = ({ handleClose, children }) => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => document.body.classList.remove("overflow-hidden");
    }, []);
    const closeModalByClickingBackground = (e) => {
        const target = e.target;
        target.className === "modal-container" && handleClose();
    };
    const handleKeyDown = (e) => {
        if (e.key === "Escape")
            handleClose();
    };
    useKeyDownListener(handleKeyDown);
    return (_jsx("div", { className: "modal-container", onClick: closeModalByClickingBackground, children: children }));
};
export default Modal;
