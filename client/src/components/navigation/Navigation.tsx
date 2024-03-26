import "./Navigation.css";
import { useState, MouseEvent, useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SearchOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import Categories from "./Categories";
import UserLinks from "./UserLinks";
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (searchBarOpen) setSearchBarOpen(false);
      else if (menuOpen) setMenuOpen(false);
    }
  };

  useKeyDownListener(handleKeyDown);

  return (
    <div id="header-container" className="center">
      <div
        id="header-wrapper"
        className={`center${headerShadow ? " shadow" : ""}`}
      >
        <header>
          <div id="header-top" className="flex">
            <button className="icon hide-desktop-nav" onClick={toggleMenuOpen}>
              {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
            <Link className="center logo" title="Home" to="/">
              S.W.
            </Link>
            <button
              className="icon hide-desktop-nav"
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
              <Categories />
              <UserLinks
                searchBarOpen={searchBarOpen}
                toggleSearchOpen={toggleSearchOpen}
              />
            </nav>
          </div>
          {searchBarOpen && (
            <Suspense>
              <Search close={toggleSearchOpen} />
            </Suspense>
          )}
        </header>
      </div>
    </div>
  );
};

export default Navigation;
