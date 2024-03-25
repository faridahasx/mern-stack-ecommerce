import { useEffect, ReactNode, MouseEvent } from "react";
import "./styles.css";
export type Props = {
  handleClose: Function;
  children?: ReactNode;
};

const Modal = ({ handleClose, children }: Props) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const closeModalByClickingBackground = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as Element;
    target.className === "modal-container" && handleClose();
  };

  return (
    <div className="modal-container" onClick={closeModalByClickingBackground}>
      {children}
    </div>
  );
};

export default Modal;
