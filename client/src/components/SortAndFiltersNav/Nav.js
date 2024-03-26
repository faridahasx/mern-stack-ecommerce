import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Nav.css";
import { Suspense, lazy, useState } from "react";
import { FilterList, Sort } from "@mui/icons-material";
import ModalLoading from "../Modal/ModalLoading";
const SortForm = lazy(() => import("../Sort/SortForm"));
const Filters = lazy(() => import("../Filters/Filters"));
const Nav = () => {
    const [openModal, setOpenModal] = useState("");
    const handleOpenSort = () => setOpenModal("sort");
    const handleOpenFilters = () => setOpenModal("filters");
    const handleCloseModal = () => setOpenModal("");
    return (_jsxs("nav", { id: "sf-nav", className: "center", children: [_jsxs("ul", { id: "sf-nav-ul", className: "center", children: [_jsx("li", { className: "center", children: _jsxs("button", { className: "hover", onClick: handleOpenSort, children: [_jsx("span", { children: _jsx(Sort, {}) }), _jsx("span", { children: "Sort" })] }) }), _jsx("li", { className: "center", children: _jsxs("button", { className: "hover", onClick: handleOpenFilters, children: [_jsx("span", { children: _jsx(FilterList, {}) }), _jsx("span", { children: "Filter" })] }) })] }), _jsx(Suspense, { fallback: _jsx(ModalLoading, { handleClose: handleCloseModal }), children: openModal === "filters" ? (_jsx(Filters, { closeModal: handleCloseModal, handleCloseModal: handleCloseModal })) : (openModal === "sort" && (_jsx(SortForm, { closeModal: handleCloseModal, handleCloseModal: handleCloseModal }))) })] }));
};
export default Nav;
