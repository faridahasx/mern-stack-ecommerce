import Modal from "../Modal/Modal";
import "./Checkout.css";

type Props = {
  handleClose: Function;
};

const Checkout = ({ handleClose }: Props) => {
  return (
    <Modal handleClose={handleClose}>
      <div id="checkout-wrapper" className="shadow">
        <h2>This website isn't taking orders right now.</h2>
        <div className="flex">
          <button className="bolder" onClick={() => handleClose()}>
            OKAY
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Checkout;
