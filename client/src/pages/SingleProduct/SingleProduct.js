import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { axiosBaseInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import Product from "../../components/product/Product";
import Error from "../../components/error/Error";
const SingleProduct = () => {
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const { executeServerRequest, loading, error, isOnline } = useMakeNetworkRequest();
    const productId = location.pathname.split("/")[2];
    useEffect(() => {
        !product &&
            executeServerRequest(async () => {
                const res = await axiosBaseInstance.get(`/api/products/${productId}`);
                setProduct(res.data);
                console.log(res.data);
            });
    }, [location, isOnline]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);
    return (_jsx(Layout, { children: loading && !product ? (_jsx(CircularProgress, {})) : product ? (_jsx(Product, { product: product })) : error ? (_jsx(Error, { heading: "Not found" })) : (!isOnline && _jsx(Error, { heading: "No internet" })) }));
};
export default SingleProduct;
