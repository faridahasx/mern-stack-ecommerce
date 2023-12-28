import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { Product } from "../../assets/types";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreTypes";
import { getAuthInstance } from "../../utils/axiosInstance";

type Props = {
  product: Product;
  products: Product[];
  setProducts: Function;
};

const ProductCard = ({ product, products, setProducts }: Props) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleDeleteProduct = async (id: string) => {
    try {
      const authInstance = await getAuthInstance();
      if (!authInstance)
        return dispatch({ type: "ERROR", payload: "Not Authorized" });

      let products_ = products.filter((item) => item._id !== id);
      setProducts(products_);
      const res = await authInstance.delete(`/api/products/${id}`);

      dispatch({ type: "SUCCESS", payload: res.data });
    } catch (err: any) {
      err.response.data &&
        dispatch({ type: "ERROR", payload: err.response.data });
    }
  };

  return (
    <li className="product-li center">
      <div className="flex product-container loaded column">
        {auth.isAdmin && (
          <div className="admin-controls center">
            <Link className="icon" to={`/edit/${product._id}`}>
              <Edit />
            </Link>
            <button
              className="icon"
              onClick={() => handleDeleteProduct(product._id)}
              title="Delete"
            >
              <Delete />
            </button>
          </div>
        )}
        <Link
          className="product-link center column"
          to={`/product/${product._id}`}
        >
          <div className="img-wrapper flex">
            <img
              className="product-img"
              src={product.images[0]["url"]}
              alt={product.title}
            />
          </div>
          <div className="details center">
            <span className="text-overflow bold detail flex">
              {product.title}
            </span>
            <span className="detail flex">$ {product.price}</span>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default ProductCard;
