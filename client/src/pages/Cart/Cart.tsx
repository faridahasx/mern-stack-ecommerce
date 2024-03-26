import "./Cart.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { CartProduct } from "../../assets/types";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { axiosInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import CartListing from "../../components/cart/CartListing";
import SubmitButton from "../../components/buttons/SubmitButton";
import ModalLoading from "../../components/modal/ModalLoading";
import RenderFetchedData from "../../components/RenderFetchedData";

const Checkout = lazy(() => import("../../components/cart/Checkout"));

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Array<CartProduct> | null>(
    null
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkout, setCheckout] = useState(false);

  const { executeServerRequest, loading, error, isOnline } =
    useMakeNetworkRequest();

  useEffect(() => {
    if (!cartProducts) {
      executeServerRequest(async () => {
        const res = await axiosInstance.get(`/api/cart`);
        setCartProducts(res.data.items);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, cartProducts]);

  useEffect(() => {
    if (cartProducts) {
      let total = cartProducts.reduce(
        (accumulator, currentValue: CartProduct) => {
          return currentValue.selected
            ? accumulator + currentValue.product.price * currentValue.quantity
            : accumulator + 0;
        },
        0
      );
      setTotalPrice(total);
    }
  }, [cartProducts]);

  const toggleCheckout = () => {
    setCheckout(!checkout);
  };

  return (
    <Layout>
      <div id="cart-top" className="center">
        <div id="total-container" className="center">
          <span id="total">
            <span className="bold">Total:</span> ${totalPrice}
          </span>
          <SubmitButton
            id="checkout-button"
            onClick={toggleCheckout}
            disabled={totalPrice === 0}
          >
            Checkout
          </SubmitButton>
        </div>
      </div>
      <RenderFetchedData
        isLoading={loading}
        isOnline={isOnline}
        isError={error}
        emptyResultMessage="Cart is empty"
        data={cartProducts}
      >
        {cartProducts && (
          <CartListing
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        )}
      </RenderFetchedData>
      <Suspense fallback={<ModalLoading handleClose={toggleCheckout} />}>
        {checkout && <Checkout handleClose={toggleCheckout} />}
      </Suspense>
    </Layout>
  );
};

export default Cart;
