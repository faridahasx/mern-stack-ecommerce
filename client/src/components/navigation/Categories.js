import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Categories.css";
import { Link, createSearchParams } from "react-router-dom";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
const categories = ["All", "Sweaters", "Sweatshirts", "T-Shirts", "Jackets"];
const Categories = () => {
    return (_jsx("ul", { id: "categories", className: "center", children: categories.map((item, index) => (_jsx("li", { className: "category-li", children: _jsxs(Link, { className: "flex category-link", to: {
                    pathname: "/products",
                    search: `${createSearchParams({ category: item })}`,
                }, children: [_jsx("span", { children: item }), _jsx(KeyboardArrowRightOutlined, { className: "dt-hidden" })] }) }, index))) }));
};
export default Categories;
