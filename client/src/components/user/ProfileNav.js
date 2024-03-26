import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./ProfileNav.css";
import { Home, Store, LocalShipping, Logout } from "@mui/icons-material";
import { axiosInstance } from "../../utils/axiosInstance";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import useClearCredentials from "../../hooks/useClearCredentials";
import { ButtonProgress } from "../Loading/Loading";
const userNav = [
    { title: "Address Book", icon: _jsx(Home, {}) },
    { title: "My Orders", icon: _jsx(Store, {}) },
    { title: "Track My Orders", icon: _jsx(LocalShipping, {}) },
];
const ProfileNav = ({ setCurrentWindow, currentWindow }) => {
    const { executeServerRequest, loading } = useMakeNetworkRequest();
    const clearCredentials = useClearCredentials();
    const handleLogout = () => {
        executeServerRequest(async () => {
            await axiosInstance.get("/api/auth/logout");
            clearCredentials();
        });
    };
    return (_jsx("nav", { id: "profile-nav", className: "flex", children: _jsxs("ul", { id: "profile-ul", className: "flex column", children: [userNav.map((item, index) => (_jsx("li", { children: _jsx("button", { className: "center", title: item.title, onClick: () => setCurrentWindow(item.title), disabled: item.title === currentWindow, children: _jsxs("span", { className: "center", children: [_jsx("span", { className: `center ${item.title !== currentWindow && "icon"}`, children: item.icon }), _jsx("span", { className: "hidden", children: item.title })] }) }) }, index))), _jsx("li", { children: _jsx("button", { className: "center", onClick: handleLogout, title: "Logout", disabled: loading, children: _jsxs("span", { className: "center", children: [_jsx("span", { className: "center", children: loading ? _jsx(ButtonProgress, {}) : _jsx(Logout, {}) }), _jsx("span", { className: "hidden center", children: "Logout" })] }) }) })] }) }));
};
export default ProfileNav;
