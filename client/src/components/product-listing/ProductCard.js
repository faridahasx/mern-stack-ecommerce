import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useAppSelector } from "../../hooks/useStoreTypes";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { axiosInstance } from "../../utils/axiosInstance";
const ProductCard = ({ product, products, setProducts }) => {
    const auth = useAppSelector((state) => state.auth);
    const { executeServerRequest } = useMakeNetworkRequest();
    const handleDeleteProduct = (id) => {
        executeServerRequest(async () => {
            const res = await axiosInstance.delete(`/api/products/${id}`);
            let products_ = products.filter((item) => item._id !== id);
            setProducts(products_);
        }, [], true, "Deleted Product");
    };
    return (_jsx("li", { className: "product-li center", children: _jsxs("div", { className: "flex product-container loaded column", children: [auth.isAdmin && (_jsxs("div", { className: "admin-controls center", children: [_jsx(Link, { className: "icon", to: `/edit/${product._id}`, children: _jsx(Edit, {}) }), _jsx("button", { className: "icon", onClick: () => handleDeleteProduct(product._id), title: "Delete", children: _jsx(Delete, {}) })] })), _jsxs(Link, { className: "product-link center column", to: `/product/${product._id}`, children: [_jsx("div", { className: "img-wrapper flex", children: _jsx("img", { className: "product-img", src: product.images[0]["url"], alt: product.title }) }), _jsxs("div", { className: "details center", children: [_jsx("span", { className: "text-overflow bold detail flex", children: product.title }), _jsxs("span", { className: "detail flex", children: ["$ ", product.price] })] })] })] }) }));
};
export default ProductCard;
