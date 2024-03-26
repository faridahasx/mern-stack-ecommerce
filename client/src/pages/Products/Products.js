import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from "../../components/Layout";
import SortFilterNav from "../../components/SortAndFiltersNav/Nav";
import ProductsListing from "../../components/ProductListing/ProductsListing";
const Products = () => {
    return (_jsxs(Layout, { children: [_jsx(SortFilterNav, {}), _jsx(ProductsListing, {})] }));
};
export default Products;
