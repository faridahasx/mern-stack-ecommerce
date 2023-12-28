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
  windowWidth: number;
  searchBarOpen: boolean;
};

const NavLinks = ({ toggleSearchOpen, searchBarOpen, windowWidth }: Props) => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <ul id="nav-icons" className="center">
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
          title={auth.isLogged ? "User" : "Login"}
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
      {windowWidth > 1000 && (
        <li>
          <button
            className="icon"
            title="Search"
            onClick={() => toggleSearchOpen()}
          >
            {searchBarOpen ? <CloseOutlined /> : <SearchOutlined />}
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
