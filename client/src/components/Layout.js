import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import "./Layout.css";
import Navigation from "./navigation/Navigation";
import Footer from "./footer/Footer";
const Layout = ({ children }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Navigation, {}), _jsx("main", { className: "layout-main flex", children: children }), _jsx(Footer, {})] }));
};
export default Layout;
