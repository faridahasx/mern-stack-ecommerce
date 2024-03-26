import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Navigation.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchOutlined, CloseOutlined, MenuOutlined, } from "@mui/icons-material";
import Categories from "./Categories";
import UserLinks from "./UserLinks";
import ModalLoading from "../modal/ModalLoading";
import useKeyDownListener from "../../hooks/useKeydownListener";
const Search = lazy(() => import("../search/Search"));
const Navigation = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const [headerShadow, setHeaderShadow] = useState(false);
    useEffect(() => {
        menuOpen && setMenuOpen(false);
    }, [location]);
    useEffect(() => {
        // Handle header shadow
        if (location.pathname.split("/")[1] === "cart" ||
            location.pathname.split("/")[1] === "products") {
            headerShadow && setHeaderShadow(false);
        }
        else {
            !headerShadow && setHeaderShadow(true);
        }
    }, [location]);
    useEffect(() => {
        // Handle overflow
        menuOpen || searchBarOpen
            ? document.body.classList.add("overflow-hidden")
            : document.body.classList.remove("overflow-hidden");
    }, [menuOpen, searchBarOpen]);
    const closeMenuByClickingBackground = (e) => {
        const target = e.target;
        target.id === "menu" && setMenuOpen(false);
    };
    const toggleMenuOpen = () => {
        !menuOpen && searchBarOpen && setSearchBarOpen(false);
        setMenuOpen(!menuOpen);
    };
    const toggleSearchOpen = () => {
        !searchBarOpen && menuOpen && setMenuOpen(false);
        setSearchBarOpen(!searchBarOpen);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            if (searchBarOpen)
                setSearchBarOpen(false);
            else if (menuOpen)
                setMenuOpen(false);
        }
    };
    useKeyDownListener(handleKeyDown);
    return (_jsx("div", { id: "header-container", className: "center", children: _jsx("div", { id: "header-wrapper", className: `center${headerShadow ? " shadow" : ""}`, children: _jsxs("header", { children: [_jsxs("div", { id: "header-top", className: "flex", children: [_jsx("button", { className: "icon hide-desktop", onClick: toggleMenuOpen, children: menuOpen ? _jsx(CloseOutlined, {}) : _jsx(MenuOutlined, {}) }), _jsx(Link, { className: "center logo", title: "Home", to: "/", children: "S.W." }), _jsx("button", { className: "icon hide-desktop", title: "Search", onClick: toggleSearchOpen, children: searchBarOpen ? _jsx(CloseOutlined, {}) : _jsx(SearchOutlined, {}) })] }), _jsx("div", { id: "menu", className: `menu-container flex ${menuOpen ? "menu-open" : ""}`, onClick: (e) => closeMenuByClickingBackground(e), children: _jsxs("nav", { className: "header-nav flex", children: [_jsx(Categories, {}), _jsx(UserLinks, { searchBarOpen: searchBarOpen, toggleSearchOpen: toggleSearchOpen })] }) }), searchBarOpen && (_jsx(Suspense, { fallback: _jsx(ModalLoading, { handleClose: toggleSearchOpen }), children: _jsx(Search, { close: toggleSearchOpen }) }))] }) }) }));
};
export default Navigation;
