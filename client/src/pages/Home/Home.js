import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from "../../components/Layout";
import CateogoriesSlider from "../../components/Home/CateogoriesSlider";
import Banner from "../../components/Home/Banner";
import ProductsListing from "../../components/ProductListing/ProductsListing";
const Home = () => {
    return (_jsxs(Layout, { children: [_jsx(CateogoriesSlider, {}), _jsx(Banner, { heading: "Popular Products" }), _jsx(ProductsListing, {})] }));
};
export default Home;
