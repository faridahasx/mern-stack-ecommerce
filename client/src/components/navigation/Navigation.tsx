import { useState, MouseEvent, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SearchOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import CategoryLinks from "./CategoryLinks";
import Search from "../Search/Search";
import UserLinks from "./UserLinks";
import "./Navigation.css";

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
    if (
      location.pathname.split("/")[1] === "cart" ||
      location.pathname.split("/")[1] === "products"
    ) {
      headerShadow && setHeaderShadow(false);
    } else {
      !headerShadow && setHeaderShadow(true);
    }
  }, [location]);

  useEffect(() => {
    // Handle overflow
    menuOpen || searchBarOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [menuOpen, searchBarOpen]);

  const closeMenuByClickingBackground = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
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

  return (
    <div id="header-container" className="center">
      <div
        id="header-wrapper"
        className={`center${headerShadow ? " shadow" : ""}`}
      >
        <header>
          <div id="header-top" className="flex">
            <button className="icon hide-desktop" onClick={toggleMenuOpen}>
              {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
            <Link className="center logo" title="Home" to="/">
              S.W.
            </Link>
            <button
              className="icon hide-desktop"
              title="Search"
              onClick={toggleSearchOpen}
            >
              {searchBarOpen ? <CloseOutlined /> : <SearchOutlined />}
            </button>
          </div>
          <div
            id="menu"
            className={`menu-container flex ${menuOpen ? "menu-open" : ""}`}
            onClick={(e) => closeMenuByClickingBackground(e)}
          >
            <nav className="header-nav flex">
              <CategoryLinks />
              <UserLinks
                searchBarOpen={searchBarOpen}
                toggleSearchOpen={toggleSearchOpen}
              />
            </nav>
          </div>
          {searchBarOpen && <Search close={toggleSearchOpen} />}
        </header>
      </div>
    </div>
  );
};

export default Navigation;
