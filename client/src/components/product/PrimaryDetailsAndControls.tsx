import "./PrimaryDetailsAndControls.css";
import { useState } from "react";
import { AddShoppingCart } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreTypes";
import { Product } from "../../assets/types";
import { axiosInstance } from "../../utils/axiosInstance";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { ButtonProgress } from "../loading/Loading";
import SubmitButton from "../buttons/SubmitButton";

type Props = {
  product: Product;
};

const PrimaryDetailsAndControls = ({ product }: Props) => {
  const [size, setSize] = useState(product.size[0]);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { executeServerRequest, loading } = useMakeNetworkRequest();

  const handleAddToCart = () => {
    if (auth.isLogged === false) {
      dispatch({
        type: "ERROR",
        payload: "Please Login",
      });
    } else {
      executeServerRequest(
        async () => {
          await axiosInstance.post("/api/cart", {
            productID: product._id,
            size: size,
          });
        },
        [],
        true,
        "Added"
      );
    }
  };

  return (
    <section id="product-primary" className="flex column">
      <div id="s-product-details" className="flex">
        <div className="product-full">
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
        <SubmitButton onClick={handleAddToCart} disabled={loading}>
          {loading ? (
            <ButtonProgress />
          ) : (
            <>
              <AddShoppingCart /> Add To Cart
            </>
          )}
        </SubmitButton>
      </div>
    </section>
  );
};

export default PrimaryDetailsAndControls;
