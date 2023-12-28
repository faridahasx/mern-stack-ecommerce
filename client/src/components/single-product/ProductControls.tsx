import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddShoppingCart } from "@mui/icons-material";
import { Product } from "../../assets/types";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreTypes";
import { getAuthInstance } from "../../utils/axiosInstance";
import { ButtonProgress } from "../loading/Loading";

type Props = {
  product: Product;
};

const ProductControls = ({ product }: Props) => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOnline = useNetworkStatus();
  const [size, setSize] = useState(product.size[0]);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!isOnline) return;
    if (!auth.isLogged) return navigate("/login");
    setLoading(true);
    try {
      const authInstance = await getAuthInstance();
      if (!authInstance) return navigate("/login");
      const res = await authInstance.post("/api/cart", {
        productID: product._id,
        size: size,
      });
      dispatch({ type: "SUCCESS", payload: res.data });
    } catch (err: any) {
      dispatch({ type: "ERROR", payload: err.response.data });
    }
    setLoading(false);
  };

  return (
    <section id="product-details-container" className="flex column">
      <div id="s-product-details" className="flex">
        <div>
          <span className="flex">
            <h1 className="product-dtl">{product.title}</h1>
            <h3 className="product-dtl">${product.price}</h3>
          </span>
          <h2 className="product-dtl">{product.description}</h2>
          <div className="product-dtl">
            <label htmlFor="size">Size:</label>
            <select
              name="size"
              onChange={(e) => setSize(e.target.value)}
              title="Select"
            >
              {product.size.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div id="add-to-cart" className="center product-dtl">
        <button onClick={handleAddToCart} disabled={loading}>
          {loading ? (
            <ButtonProgress />
          ) : (
            <>
              <AddShoppingCart /> Add To Cart
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default ProductControls;
