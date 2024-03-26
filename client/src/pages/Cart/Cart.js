import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Cart.css";
import { useState, useEffect, lazy, Suspense } from "react";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { axiosInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import CartListing from "../../components/Cart/CartListing";
import SubmitButton from "../../components/Buttons/SubmitButton";
import ModalLoading from "../../components/Modal/ModalLoading";
import RenderFetchedData from "../../components/RenderFetchedData";
const Checkout = lazy(() => import("../../components/Cart/Checkout"));
const Cart = () => {
    const [cartProducts, setCartProducts] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkout, setCheckout] = useState(false);
    const { executeServerRequest, loading, error, isOnline } = useMakeNetworkRequest();
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
            let total = cartProducts.reduce((accumulator, currentValue) => {
                return currentValue.selected
                    ? accumulator + currentValue.product.price * currentValue.quantity
                    : accumulator + 0;
            }, 0);
            setTotalPrice(total);
        }
    }, [cartProducts]);
    const toggleCheckout = () => {
        setCheckout(!checkout);
    };
    return (_jsxs(Layout, { children: [_jsx("div", { id: "cart-top", className: "center", children: _jsxs("div", { id: "total-container", className: "center", children: [_jsxs("span", { id: "total", children: [_jsx("span", { className: "bold", children: "Total:" }), " $", totalPrice] }), _jsx(SubmitButton, { id: "checkout-button", onClick: toggleCheckout, disabled: totalPrice === 0, children: "Checkout" })] }) }), _jsx(RenderFetchedData, { isLoading: loading, isOnline: isOnline, isError: error, emptyResultMessage: "Cart is empty", data: cartProducts, children: cartProducts && (_jsx(CartListing, { cartProducts: cartProducts, setCartProducts: setCartProducts })) }), _jsx(Suspense, { fallback: _jsx(ModalLoading, { handleClose: toggleCheckout }), children: checkout && _jsx(Checkout, { handleClose: toggleCheckout }) })] }));
};
export default Cart;
