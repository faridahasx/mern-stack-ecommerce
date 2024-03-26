import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Filters.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterList } from "@mui/icons-material";
import { filterValues } from "../../assets/constants";
import SubmitButton from "../buttons/SubmitButton";
import ClearButton from "../buttons/ClearButton";
import OpenFieldsButton from "./OpenFieldsButton";
import Field from "./Fields";
import PriceFilterField from "./PriceFilter";
import FormDialog from "../form-dialog/FormDialog";
const Filters = ({ handleCloseModal, closeModal }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        category: searchParams.get("category")?.split(",") ?? [],
        sleeve: searchParams.get("sleeve")?.split(",") ?? [],
        color: searchParams.get("color")?.split(",") ?? [],
        size: searchParams.get("size")?.split(",") ?? [],
    });
    const [priceFilter, setPriceFilter] = useState({
        min: Number(searchParams.get("min")) | 0,
        max: Number(searchParams.get("max")) | 0,
    });
    const [openFilter, setOpenFilter] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        filters.category.length
            ? searchParams.set("category", filters.category.join(","))
            : searchParams.delete("category");
        filters.sleeve.length
            ? searchParams.set("sleeve", filters.sleeve.join(","))
            : searchParams.delete("sleeve");
        filters.color.length
            ? searchParams.set("color", filters.color.join(","))
            : searchParams.delete("color");
        filters.size.length
            ? searchParams.set("size", filters.size.join(","))
            : searchParams.delete("size");
        Number(priceFilter.min) > 0
            ? searchParams.set("min", String(priceFilter.min))
            : searchParams.delete("min");
        Number(priceFilter.max) > 0
            ? searchParams.set("max", String(priceFilter.max))
            : searchParams.delete("max");
        setSearchParams(searchParams);
        closeModal();
    };
    const handleClearFilters = (e) => {
        e.preventDefault();
        setFilters({ category: [], sleeve: [], color: [], size: [] });
        setPriceFilter({ min: 0, max: 0 });
    };
    return (_jsxs(FormDialog, { handleClose: handleCloseModal, handleSubmit: handleSubmit, Icon: _jsx(FilterList, {}), legend: "Filters", children: [_jsx("div", { id: "filters", children: Object.keys(filterValues).map((filterName, index) => (_jsxs("fieldset", { children: [_jsx(OpenFieldsButton, { filterName: filterName, openFilter: openFilter, setOpenFilter: setOpenFilter }), openFilter === filterName &&
                            (filterName !== "price" ? (_jsx(Field, { filters: filters, setFilters: setFilters, filterName: filterName })) : (_jsx(PriceFilterField, { priceFilter: priceFilter, setPriceFilter: setPriceFilter })))] }, index))) }), _jsxs("div", { className: "flex", id: "filters-bottom", children: [_jsx(SubmitButton, { type: "submit", children: "Apply" }), _jsx(ClearButton, { onClick: handleClearFilters, children: "Clear" })] })] }));
};
export default Filters;
