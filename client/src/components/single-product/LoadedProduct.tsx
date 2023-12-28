import { Link, createSearchParams } from "react-router-dom";
import { DoubleArrow } from "@mui/icons-material";
import { Product } from "../../assets/types";
import ImageSlider from "./image-slider/ImageSlider";
import ProductControls from "./ProductControls";
import ProductDetailsChart from "./ProductDetailsChart";

type Props = {
  product: Product;
};

const LoadedProduct = ({ product }: Props) => {
  return (
    <div className="l-product flex">
      <ImageSlider images={product.images} />
      <div id="product-controls-and-details" className="flex column">
        <ProductControls product={product} />
        <ProductDetailsChart product={product} />
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
            <span className="center">See More {product.category}</span>
            <span className="center">
              <DoubleArrow />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoadedProduct;
