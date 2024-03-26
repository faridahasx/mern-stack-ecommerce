import { ReactNode, ButtonHTMLAttributes } from "react";
import "./styles.css";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  className?: string;
}

const SubmitButton = ({ children, className, ...buttonProps }: Props) => {
  return (
    <button className={`submit-button ${className}`} {...buttonProps}>
      {children}
    </button>
  );
};

export default SubmitButton;
