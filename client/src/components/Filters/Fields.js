import { jsx as _jsx } from "react/jsx-runtime";
import "./Fields.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Done } from "@mui/icons-material";
import { filterValues } from "../../assets/constants";
const Fields = ({ filters, setFilters, filterName }) => {
    const handleFiltersChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const filterNameKey = name;
        const index = filters[filterNameKey].indexOf(value);
        setFilters({
            ...filters,
            [name]: index === -1
                ? [...filters[filterNameKey], value]
                : filters[filterNameKey].filter((item) => item !== value),
        });
    };
    return (_jsx("div", { className: "field flex column", children: filterValues[filterName].map((val, valInd) => (_jsx(FormControlLabel, { className: "flex hover", onChange: handleFiltersChange, label: val, name: filterName, value: val, control: filters[filterName].indexOf(val) === -1 ? (_jsx(Checkbox, { icon: _jsx("span", { className: "icon" }), checked: false })) : (_jsx(Checkbox, { checkedIcon: _jsx("span", { className: "icon", children: _jsx(Done, {}) }), checked: true })) }, valInd))) }));
};
export default Fields;
