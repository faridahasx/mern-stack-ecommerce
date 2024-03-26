import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import OutlinedInput from "@mui/material/OutlinedInput";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { productValues } from "../../assets/constants";
const SelectInput = ({ setSelectInputData, selectInputData }) => {
    const handleSelectInputChange = (e) => {
        let target = e.target;
        const { name, value } = target;
        if (!name)
            return;
        name === "size"
            ? setSelectInputData({
                ...selectInputData,
                size: typeof value === "string" ? value.split(",") : value,
            })
            : setSelectInputData({ ...selectInputData, [name]: value });
    };
    return (_jsx(_Fragment, { children: Object.keys(productValues).map((item, index) => (_jsxs("span", { children: [_jsx(InputLabel, { id: item, children: item }), _jsx(Select, { id: item, className: "product-input", labelId: item, input: _jsx(OutlinedInput, { label: item }), onChange: handleSelectInputChange, multiple: item === "size", name: item, value: selectInputData[item], children: productValues[item].map((s) => (_jsx(MenuItem, { value: s, children: s }, s))) })] }, index))) }));
};
export default SelectInput;
