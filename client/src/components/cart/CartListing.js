import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./CartListing.css";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { axiosInstance } from "../../utils/axiosInstance";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
const qtyOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const CartListing = ({ cartProducts, setCartProducts }) => {
    const { executeServerRequest } = useMakeNetworkRequest();
    const handleSelect = async (e) => {
        e.preventDefault();
        let { value, checked } = e.target;
        let updatedCart = cartProducts.map((item) => {
            if (item._id === value) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setCartProducts(updatedCart);
        executeServerRequest(async () => {
            await axiosInstance.patch(`/api/cart/select/${value}`, {
                selected: checked,
            });
        });
    };
    const handleQuantity = async (e, id) => {
        let quantity = Number(e.target.value);
        if (quantity === 0) {
            setCartProducts(cartProducts.filter((item) => item._id !== id));
        }
        else {
            let updatedCart = cartProducts.map((item) => {
                if (item._id === id) {
                    return { ...item, quantity: quantity };
                }
                return item;
            });
            setCartProducts(updatedCart);
        }
        executeServerRequest(async () => {
            await axiosInstance.patch(`/api/cart/quantity/${id}`, {
                quantity: quantity,
            });
        });
    };
    return (_jsx("ul", { className: "cart-products-container center column", children: cartProducts.map((item) => (_jsxs("li", { className: "cart-product-li hvr-shadow flex", children: [_jsx("div", { className: "cb center", children: _jsx(FormControlLabel, { className: "checkbox center", label: true, control: item.selected ? (_jsx(Checkbox, { checked: true })) : (_jsx(Checkbox, { checked: false })), onChange: handleSelect, value: item._id }) }), _jsx(Link, { className: "center", to: `/product/${item.product._id}`, children: _jsx("img", { className: "cart-img", src: item.product.images[0]["url"], alt: item.product.title }) }), _jsxs("ul", { className: "cart-item-details flex column", children: [_jsx("li", { className: "bold title", children: _jsx(Link, { to: `/product/${item.product._id}`, children: item.product.title }) }), _jsxs("li", { children: [_jsx("span", { className: "cart-item-grid", children: "Size:" }), _jsx("span", { children: item.size })] }), _jsx("li", { children: _jsxs("label", { children: [_jsx("span", { className: "cart-item-grid", children: "QTY:" }), _jsx("select", { name: "Quantity", value: item.quantity, onChange: (e) => handleQuantity(e, item._id), children: qtyOptions.map((qty) => (_jsx("option", { value: qty, children: qty }, qty))) })] }) }), _jsxs("li", { className: "bolder", children: ["$", item.product.price * item.quantity] })] })] }, item._id))) }));
};
export default CartListing;
