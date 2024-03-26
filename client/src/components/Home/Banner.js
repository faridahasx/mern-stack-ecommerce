import { jsx as _jsx } from "react/jsx-runtime";
import "./Banner.css";
import { Link } from "react-router-dom";
const Banner = ({ heading }) => {
    return (_jsx("div", { id: "banner", className: "center", children: _jsx(Link, { className: "center", to: "/products", children: _jsx("h1", { className: "text-overflow", children: heading }) }) }));
};
export default Banner;
