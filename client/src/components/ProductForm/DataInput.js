import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { InputLabel, Input } from "@mui/material";
const DataInput = ({ inputData, setInputData }) => {
    const handleDataInputChange = (e) => {
        let target = e.target;
        const { name, value } = target;
        setInputData({ ...inputData, [name]: value });
    };
    return (_jsx(_Fragment, { children: Object.keys(inputData).map((item, indx) => item !== "img" && (_jsxs("div", { children: [_jsxs(InputLabel, { htmlFor: item, children: [" ", item, " "] }), _jsx(Input, { id: item, className: "product-input", type: item === "price" || item === "inStock" ? "number" : "text", onChange: handleDataInputChange, name: item, value: inputData[item] })] }, indx))) }));
};
export default DataInput;
