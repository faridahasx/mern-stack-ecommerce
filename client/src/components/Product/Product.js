import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Product.css";
import { Link, createSearchParams } from "react-router-dom";
import { DoubleArrow } from "@mui/icons-material";
import ImageSlider from "./ImageSlider";
import PrimaryDetailsAndControls from "./PrimaryDetailsAndControls";
import DetailsTable from "./DetailsTable";
const Product = ({ product }) => {
    return (_jsxs("div", { className: "single-product flex", children: [_jsx(ImageSlider, { images: product.images }), _jsxs("div", { id: "product-primary", className: "flex column", children: [_jsx(PrimaryDetailsAndControls, { product: product }), _jsx(DetailsTable, { product: product }), _jsx("div", { className: "center see-more", children: _jsxs(Link, { className: "flex", to: {
                                pathname: "/products",
                                search: `${createSearchParams({
                                    category: product.category,
                                    page: "1",
                                })}`,
                            }, children: [_jsx("span", { className: "center", children: product.category }), _jsx("span", { className: "center", children: _jsx(DoubleArrow, {}) })] }) })] })] }));
};
export default Product;
