import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./OpenFieldsButton.css";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
const OpenFieldsButton = ({ openFilter, setOpenFilter, filterName }) => {
    const toggleOpenFilter = (e) => {
        e.preventDefault();
        openFilter === filterName ? setOpenFilter("") : setOpenFilter(filterName);
    };
    let buttonName = filterName.charAt(0).toUpperCase() + filterName.slice(1);
    return (_jsxs("button", { className: `ofv-btn hover center ${openFilter === filterName ? " shadow" : ""}`, onClick: toggleOpenFilter, children: [buttonName, _jsx("span", { className: "center", children: openFilter === filterName ? (_jsx(KeyboardArrowUp, {})) : (_jsx(KeyboardArrowDown, {})) })] }));
};
export default OpenFieldsButton;
