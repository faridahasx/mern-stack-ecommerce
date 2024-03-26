import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./UserLinks.css";
import { Link } from "react-router-dom";
import { PersonOutlined, LocalMallOutlined, SearchOutlined, CloseOutlined, FileUploadOutlined, } from "@mui/icons-material";
import { useAppSelector } from "../../hooks/useStoreTypes";
const NavLinks = ({ toggleSearchOpen, searchBarOpen }) => {
    const auth = useAppSelector((state) => state.auth);
    return (_jsxs("ul", { id: "user-links", className: "center", children: [auth.isAdmin && (_jsx("li", { children: _jsx(Link, { className: "icon", title: "Add Product", to: "/add", children: _jsx(FileUploadOutlined, {}) }) })), _jsx("li", { children: _jsx(Link, { className: "icon", title: auth.isLogged ? "Profile" : "Login", to: auth.isLogged ? "/user" : "/login", children: _jsx(PersonOutlined, {}) }) }), _jsx("li", { children: _jsx(Link, { className: "icon", title: "Cart", to: "/cart", children: _jsx(LocalMallOutlined, {}) }) }), _jsx("li", { className: "hide-mobile", children: _jsx("button", { className: "icon", title: "Search", onClick: () => toggleSearchOpen(), children: searchBarOpen ? _jsx(CloseOutlined, {}) : _jsx(SearchOutlined, {}) }) })] }));
};
export default NavLinks;
