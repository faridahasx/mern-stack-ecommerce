import { Link } from "react-router-dom";

const ProductsHeading = () => {
  return (
    <div id="products-heading" className="center">
      <Link className="center" to={"/products"}>
        <h1 className="text-overflow">Popular products</h1>
      </Link>
    </div>
  );
};

export default ProductsHeading;
