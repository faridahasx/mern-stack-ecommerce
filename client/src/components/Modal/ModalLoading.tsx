import Modal, { Props } from "./Modal";
import { CircularProgress } from "@mui/material";

const ModalLoading = ({ handleClose }: Props) => {
  return (
    <Modal handleClose={handleClose}>
      <CircularProgress />
    </Modal>
  );
};

export default ModalLoading;
