import { Link, createSearchParams } from "react-router-dom";
import { DoubleArrow } from "@mui/icons-material";
import { Product as ProductType } from "../../assets/types";
import ImageSlider from "./ImageSlider";
import PrimaryDetailsAndControls from "./PrimaryDetailsAndControls";
import DetailsTable from "./DetailsTable";
import "./Product.css";

type Props = {
  product: ProductType;
};

const Product = ({ product }: Props) => {
  return (
    <div className="single-product flex">
      <ImageSlider images={product.images} />
      <div id="product-primary" className="flex column">
        <PrimaryDetailsAndControls product={product} />
        <DetailsTable product={product} />
        <div className="center see-more">
          <Link
            className="flex"
            to={{
              pathname: "/products",
              search: `${createSearchParams({
                category: product.category,
                page: "1",
              })}`,
            }}
          >
            <span className="center">{product.category}</span>
            <span className="center">
              <DoubleArrow />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
