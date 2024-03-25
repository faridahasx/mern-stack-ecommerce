import SubmitButton, { Props } from "./SubmitButton";

const ClearButton = ({ children, className, ...buttonProps }: Props) => {
  return (
    <SubmitButton className="clear-button" {...buttonProps}>
      {children}
    </SubmitButton>
  );
};

export default ClearButton;
