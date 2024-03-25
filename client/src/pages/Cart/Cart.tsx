import "./Cart.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { CartProduct } from "../../assets/types";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { axiosInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import CartListing from "../../components/Cart/CartListing";
import SubmitButton from "../../components/Buttons/SubmitButton";
import ModalLoading from "../../components/Modal/ModalLoading";
import Error from "../../components/Error/Error";

const Checkout = lazy(() => import("../../components/Cart/Checkout"));

const Cart = () => {
  const isOnline = useNetworkStatus();
  const [cartProducts, setCartProducts] = useState<Array<CartProduct> | null>(
    null
  );
  const [totalPrice, setTotalPrice] = useState(0);
  // const [loading, setLoading] = useState(true);
  const [checkout, setCheckout] = useState(false);

  const { executeServerRequest, loading, error } = useMakeNetworkRequest();

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
            disabled={loading || !cartProducts}
          >
            Checkout
          </SubmitButton>
        </div>
      </div>
      {loading ? (
        <CircularProgress />
      ) : cartProducts && cartProducts.length > 0 ? (
        <CartListing
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
        />
      ) : error ? (
        <Error />
      ) : (
        !loading && "Cart is empty"
      )}
      <Suspense fallback={<ModalLoading handleClose={toggleCheckout} />}>
        {checkout && <Checkout handleClose={toggleCheckout} />}
      </Suspense>
    </Layout>
  );
};

export default Cart;
