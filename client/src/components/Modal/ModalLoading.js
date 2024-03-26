import { jsx as _jsx } from "react/jsx-runtime";
import Modal from "./Modal";
import { CircularProgress } from "@mui/material";
const ModalLoading = ({ handleClose }) => {
    return (_jsx(Modal, { handleClose: handleClose, children: _jsx(CircularProgress, {}) }));
};
export default ModalLoading;
