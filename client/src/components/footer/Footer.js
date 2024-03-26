import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Footer.css";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
const links = [
    {
        href: "mailto:farida.hasanova009@gmail.com? &subject=Project",
        icon: _jsx(EmailIcon, {}),
    },
    { href: "https://github.com/faridahasx", icon: _jsx(GitHubIcon, {}) },
    {
        href: "https://www.instagram.com/faridahasx",
        icon: _jsx(InstagramIcon, {}),
    },
    {
        href: "https://www.linkedin.com/in/faridahasx",
        icon: _jsx(LinkedInIcon, {}),
    },
    { href: "https://twitter.com/faridahasx", icon: _jsx(TwitterIcon, {}) },
];
const DEVELOPER_CONTACT_URL = import.meta.env.VITE_DEVELOPER_CONTACT_URL;
const Footer = () => {
    return (_jsxs("footer", { className: "center column", children: [_jsx(Link, { to: DEVELOPER_CONTACT_URL, target: "_blank", title: "Farida Hasanova", className: "center", children: "Contact the developer" }), _jsx("nav", { className: "center", children: _jsx("ul", { className: "flex", children: links.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.href, target: "_blank", children: link.icon }) }))) }) })] }));
};
export default Footer;
