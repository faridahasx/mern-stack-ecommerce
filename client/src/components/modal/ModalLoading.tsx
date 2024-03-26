import Modal, { Props } from "./Modal";
import { CircularProgress } from "@mui/material";

const ModalLoading = ({ handleClose }: Props) => {
  return (
    <Modal handleClose={handleClose}>
      <CircularProgress sx={{ color: "white" }} />
    </Modal>
  );
};

export default ModalLoading;
