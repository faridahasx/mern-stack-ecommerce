import { MouseEvent } from "react";

type Props = {
  close: Function;
};

const Checkout = ({ close }: Props) => {
  const closeModalByClickingBackground = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as Element;
    target.className === "modal-container" && close();
  };

  return (
    <section
      className="modal-container"
      onClick={closeModalByClickingBackground}
    >
      <div id="checkout-wrapper" className="shadow">
        <h2>This website isn't taking orders right now.</h2>
        <div className="flex">
          <button className="bolder" onClick={() => close()}>
            OKAY
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
