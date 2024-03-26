import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./PriceFilter.css";
import { Input, InputAdornment } from "@mui/material";
const PriceFilter = ({ priceFilter, setPriceFilter }) => {
    const handlePriceChange = (e) => {
        let target = e.target;
        const { name, value } = target;
        setPriceFilter({ ...priceFilter, [name]: value });
    };
    const { min, max } = priceFilter;
    return (_jsxs("div", { id: "price-filter", className: "filter-values flex", children: [_jsx(Input, { className: "price-input", type: "number", onChange: handlePriceChange, placeholder: "min", value: min, name: "min", startAdornment: _jsx(InputAdornment, { position: "start", children: "$" }) }), _jsx("span", { children: "-" }), _jsx(Input, { className: "price-input", type: "number", onChange: handlePriceChange, placeholder: "max", value: max, name: "max", startAdornment: _jsx(InputAdornment, { position: "start", children: "$" }) })] }));
};
export default PriceFilter;
