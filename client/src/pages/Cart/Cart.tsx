import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { CartProduct } from "../../assets/types";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { getAuthInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import CartProducts from "../../components/cart/CartProducts";
import CartLoading from "../../components/cart/CartLoading";
import "./styles.css";

const Checkout = lazy(() => import("../../components/cart/Checkout"));

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOnline = useNetworkStatus();
  const [cartProducts, setCartProducts] = useState([]);
  const [length, setLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    checkout
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout]);

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: "TRANSITION", payload: true });
      try {
        const authInstance = await getAuthInstance();
        if (!authInstance) return navigate("/login");
        const res = await authInstance.get(`/api/cart`);
        setCartProducts(res.data.items);
        setLength(res.data.length);
      } catch (err) {
        dispatch({ type: "ERROR", payload: "Something went wrong." });
      }
      setLoading(false);
      dispatch({ type: "TRANSITION", payload: false });
    };
    if (length === 0 && isOnline) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  useEffect(() => {
    let total = cartProducts.reduce(
      (accumulator, currentValue: CartProduct) => {
        return currentValue.selected
          ? accumulator + currentValue.product.price * currentValue.quantity
          : accumulator + 0;
      },
      0
    );
    setTotalPrice(total);
  }, [cartProducts]);

  const toggleCheckout = () => {
    setCheckout(!checkout);
  };

  return (
    <Layout>
      <main id="cart-main" className="flex">
        <div id="cart-top" className="center">
          <div id="total-container" className="center">
            <span id="total">
              <span className="bold">Total:</span> $ {totalPrice}
            </span>
            <button
              id="checkout-button"
              className="bold"
              onClick={toggleCheckout}
              disabled={loading || length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
        {loading ? (
          <CartLoading />
        ) : length > 0 ? (
          <CartProducts
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        ) : (
          !loading && <div className="empty center">Cart is empty</div>
        )}
        <Suspense>{checkout && <Checkout close={toggleCheckout} />}</Suspense>
      </main>
    </Layout>
  );
};

export default Cart;
