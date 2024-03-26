import useKeyDownListener from "../../hooks/useKeydownListener";
import "./Modal.css";
import { useEffect, ReactNode, MouseEvent } from "react";

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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  useKeyDownListener(handleKeyDown);

  return (
    <div className="modal-container" onClick={closeModalByClickingBackground}>
      {children}
    </div>
  );
};

export default Modal;
