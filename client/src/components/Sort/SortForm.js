import { jsx as _jsx } from "react/jsx-runtime";
import "./SortForm.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Done, Sort } from "@mui/icons-material";
import { sortValues } from "../../assets/constants";
import FormDialog from "../form-dialog/FormDialog";
const SortForm = ({ handleCloseModal, closeModal }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(searchParams.get("sort") || "");
    const handleSorting = (e) => {
        let value = e.target.value;
        setSort(value);
        searchParams.set("sort", value);
        setSearchParams(searchParams);
        closeModal();
    };
    const handleSubmit = (e) => e.preventDefault();
    return (_jsx(FormDialog, { handleClose: handleCloseModal, handleSubmit: handleSubmit, Icon: _jsx(Sort, {}), legend: "Sort By:", children: Object.keys(sortValues).map((val, valInd) => (_jsx(FormControlLabel, { className: "sort-value flex hover", onChange: handleSorting, value: sortValues[val], label: val, control: sort !== sortValues[val] ? (_jsx(Checkbox, { icon: _jsx("span", { className: "icon" }), checked: false })) : (_jsx(Checkbox, { checkedIcon: _jsx("span", { className: "icon", children: _jsx(Done, {}) }), checked: true })) }, valInd))) }));
};
export default SortForm;
