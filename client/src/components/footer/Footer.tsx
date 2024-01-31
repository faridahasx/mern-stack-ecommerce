import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import "./styles.css";

const links = [
  {
    href: "mailto:farida.hasanova009@gmail.com? &subject=Project",
    icon: <EmailIcon />,
  },
  { href: "https://github.com/faridahasx", icon: <GitHubIcon /> },
  {
    href: "https://www.instagram.com/faridahasx",
    icon: <InstagramIcon />,
  },
  {
    href: "https://www.linkedin.com/in/faridahasx",
    icon: <LinkedInIcon />,
  },
  { href: "https://twitter.com/faridahasx", icon: <TwitterIcon /> },
];

const DEVELOPER_CONTACT_URL = import.meta.env.VITE_DEVELOPER_CONTACT_URL;

const Footer = () => {
  return (
    <footer className="center column">
      <Link
        to={DEVELOPER_CONTACT_URL}
        target="_blank"
        title="Farida Hasanova"
        className="center"
      >
        Contact the developer
      </Link>
      <nav className="center">
        <ul className="flex">
          {links.map((link) => (
            <li>
              <Link to={link.href} target="_blank">
                {link.icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
