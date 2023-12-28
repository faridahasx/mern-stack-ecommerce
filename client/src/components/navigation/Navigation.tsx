import { useState, MouseEvent, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SearchOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import useWindowSize from "../../hooks/useWindowSize";
import CategoryLinks from "./CategoryLinks";
import Search from "../search/Search";
import PrimaryLinks from "./PrimaryLinks";
import "./styles.css";

const Navigation = () => {
  const location = useLocation();
  const dimensions = useWindowSize();
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
    // set vh based off of inner height
    (document.querySelector(":root") as HTMLElement).style.setProperty(
      "--vh",
      window.innerHeight / 100 + "px"
    );
  }, [dimensions]);

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
            {dimensions.width <= 1000 && (
              <button className="icon" onClick={toggleMenuOpen}>
                {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
              </button>
            )}
            <Link className="center logo" title="Home" to="/">
              S.W.
            </Link>
            {dimensions.width <= 1000 && (
              <button
                className="icon"
                title="Search"
                onClick={toggleSearchOpen}
              >
                {searchBarOpen ? <CloseOutlined /> : <SearchOutlined />}
              </button>
            )}
          </div>
          <div
            id="menu"
            className={`menu-container flex ${menuOpen ? "menu-open" : ""}`}
            onClick={(e) => closeMenuByClickingBackground(e)}
          >
            <nav className="header-nav flex">
              <CategoryLinks windowWidth={dimensions.width} />
              <PrimaryLinks
                searchBarOpen={searchBarOpen}
                toggleSearchOpen={toggleSearchOpen}
                windowWidth={dimensions.width}
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
