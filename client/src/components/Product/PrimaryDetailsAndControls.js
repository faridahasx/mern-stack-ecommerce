import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./PrimaryDetailsAndControls.css";
import { useState } from "react";
import { AddShoppingCart } from "@mui/icons-material";
import { axiosInstance } from "../../utils/axiosInstance";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { ButtonProgress } from "../loading/Loading";
import SubmitButton from "../buttons/SubmitButton";
const PrimaryDetailsAndControls = ({ product }) => {
    const [size, setSize] = useState(product.size[0]);
    const { executeServerRequest, loading } = useMakeNetworkRequest();
    const handleAddToCart = () => {
        executeServerRequest(async () => {
            await axiosInstance.post("/api/cart", {
                productID: product._id,
                size: size,
            });
        }, [], true, "Added");
    };
    return (_jsxs("section", { id: "product-primary", className: "flex column", children: [_jsx("div", { id: "s-product-details", className: "flex", children: _jsxs("div", { children: [_jsxs("span", { className: "flex", children: [_jsx("h1", { className: "product-dtl", children: product.title }), _jsxs("h3", { className: "product-dtl", children: ["$", product.price] })] }), _jsx("h2", { className: "product-dtl", children: product.description }), _jsxs("div", { className: "product-dtl", children: [_jsx("label", { htmlFor: "size", children: "Size:" }), _jsx("select", { name: "size", onChange: (e) => setSize(e.target.value), title: "Select", children: product.size.map((size, index) => (_jsx("option", { value: size, children: size }, index))) })] })] }) }), _jsx("div", { id: "add-to-cart", className: "center product-dtl", children: _jsx(SubmitButton, { onClick: handleAddToCart, disabled: loading, children: loading ? (_jsx(ButtonProgress, {})) : (_jsxs(_Fragment, { children: [_jsx(AddShoppingCart, {}), " Add To Cart"] })) }) })] }));
};
export default PrimaryDetailsAndControls;
