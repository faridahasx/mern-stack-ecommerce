import { Link, createSearchParams } from "react-router-dom";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import "./CategoryLinks.css";

const categories = ["All", "Sweaters", "Sweatshirts", "T-Shirts", "Jackets"];

const CategoryLinks = () => {
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

            <KeyboardArrowRightOutlined className="dt-hidden" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryLinks;
