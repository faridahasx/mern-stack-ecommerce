import "./UserLinks.css";
import { Link } from "react-router-dom";
import {
  PersonOutlined,
  LocalMallOutlined,
  SearchOutlined,
  CloseOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";
import { useAppSelector } from "../../hooks/useStoreTypes";

type Props = {
  toggleSearchOpen: Function;
  searchBarOpen: boolean;
};

const NavLinks = ({ toggleSearchOpen, searchBarOpen }: Props) => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <ul id="user-links" className="center">
      {auth.isAdmin && (
        <li>
          <Link className="icon" title="Add Product" to="/add">
            <FileUploadOutlined />
          </Link>
        </li>
      )}
      <li>
        <Link
          className="icon"
          title={auth.isLogged ? "Profile" : "Login"}
          to={auth.isLogged ? "/user" : "/login"}
        >
          <PersonOutlined />
        </Link>
      </li>
      <li>
        <Link className="icon" title="Cart" to="/cart">
          <LocalMallOutlined />
        </Link>
      </li>
      <li className="hide-mobile">
        <button
          className="icon"
          title="Search"
          onClick={() => toggleSearchOpen()}
        >
          {searchBarOpen ? <CloseOutlined /> : <SearchOutlined />}
        </button>
      </li>
    </ul>
  );
};

export default NavLinks;
