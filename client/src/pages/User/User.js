import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./User.css";
import { useState } from "react";
import ProfileNav from "../../components/user/ProfileNav";
import AddressBook from "../../components/user/AddressBook";
import Layout from "../../components/Layout";
const User = () => {
    const [currentWindow, setCurrentWindow] = useState("Address Book");
    return (_jsx(Layout, { children: _jsxs("section", { id: "profile", className: "flex", children: [_jsx(ProfileNav, { setCurrentWindow: setCurrentWindow, currentWindow: currentWindow }), _jsx("section", { id: "profile-window", className: "flex column", children: currentWindow === "" || currentWindow === "Address Book" ? (_jsx(AddressBook, {})) : (_jsx("h1", { id: "profile-window-empty", className: "center", children: "You don't have any orders yet" })) })] }) }));
};
export default User;
