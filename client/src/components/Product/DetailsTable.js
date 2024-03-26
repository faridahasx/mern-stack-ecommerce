import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./DetailsTable.css";
const DetailsTable = ({ product }) => {
    return (_jsxs("table", { id: "details-table", className: "flex", children: [_jsx("thead", { children: _jsxs("tr", { className: "flex column", children: [_jsx("th", { children: "Category:" }), _jsx("th", { children: "Sleeve Type:" }), _jsx("th", { children: "Color:" }), _jsx("th", { children: "Available Size:" })] }) }), _jsx("tbody", { children: _jsxs("tr", { className: "flex column", children: [_jsx("td", { className: "flex", children: product.category }), _jsx("td", { children: product.sleeve }), _jsx("td", { children: product.color }), _jsx("td", { children: product.size.join(", ") })] }) })] }));
};
export default DetailsTable;
