import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from "../../components/Layout";
import SortFilterNav from "../../components/sort-and-filters-nav/Nav";
import ProductsListing from "../../components/product-listing/ProductsListing";
const Products = () => {
    return (_jsxs(Layout, { children: [_jsx(SortFilterNav, {}), _jsx(ProductsListing, {})] }));
};
export default Products;
