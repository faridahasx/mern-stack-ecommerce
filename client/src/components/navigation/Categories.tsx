import "./Categories.css";
import { Link, createSearchParams } from "react-router-dom";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";

const categories = ["All", "Sweaters", "Sweatshirts", "T-Shirts", "Jackets"];

const Categories = () => {
  return (
    <ul id="categories" className="center">
      {categories.map((item, index) => (
        <li className="category-li" key={index}>
          <Link
            className="flex category-link"
            to={{
              pathname: "/products",
              search: `${createSearchParams({ category: item })}`,
            }}
          >
            <span>{item}</span>
            <span className="hide-desktop-nav">
              <KeyboardArrowRightOutlined />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
