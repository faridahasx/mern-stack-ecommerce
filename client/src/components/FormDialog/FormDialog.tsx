import "./FormDialog.css";
import { FormEventHandler, MouseEventHandler, ReactNode } from "react";
import { CloseOutlined } from "@mui/icons-material";
import Modal, { Props as ModalProps } from "../Modal/Modal";

interface Props extends ModalProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleClose: MouseEventHandler<HTMLButtonElement>;
  Icon: ReactNode;
  legend: string;
}

const FormDialog = ({
  handleSubmit,
  handleClose,
  children,
  Icon,
  legend,
}: Props) => {
  return (
    <Modal handleClose={handleClose}>
      <form className="dialog-form center column" onSubmit={handleSubmit}>
        <div className="flex dialog-form-top">
          <span className="flex dialog-legend-container">
            <span className="center legend-icon">{Icon}</span>
            <legend className="bolder">{legend}</legend>
          </span>
          <button className="icon" onClick={handleClose}>
            <CloseOutlined />
          </button>
        </div>
        <div className="center column dialog-values">{children}</div>
      </form>
    </Modal>
  );
};

export default FormDialog;
