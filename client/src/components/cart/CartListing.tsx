import "./CartListing.css";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { CartProduct } from "../../assets/types";
import { axiosInstance } from "../../utils/axiosInstance";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";

type Props = {
  cartProducts: CartProduct[];
  setCartProducts: Function;
};

const qtyOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CartListing = ({ cartProducts, setCartProducts }: Props) => {
  const { executeServerRequest } = useMakeNetworkRequest();

  const handleSelect = async (e: ChangeEvent<{}>) => {
    e.preventDefault();
    let { value, checked } = e.target as HTMLInputElement;

    let updatedCart = cartProducts.map((item) => {
      if (item._id === value) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setCartProducts(updatedCart);
    executeServerRequest(async () => {
      await axiosInstance.patch(`/api/cart/select/${value}`, {
        selected: checked,
      });
    });
  };

  const handleQuantity = async (
    e: ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    let quantity = Number((e.target as HTMLSelectElement).value);
    if (quantity === 0) {
      setCartProducts(
        cartProducts.filter((item: CartProduct) => item._id !== id)
      );
    } else {
      let updatedCart = cartProducts.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      setCartProducts(updatedCart);
    }
    executeServerRequest(async () => {
      await axiosInstance.patch(`/api/cart/quantity/${id}`, {
        quantity: quantity,
      });
    });
  };

  return (
    <ul className="cart-products-container center column">
      {cartProducts.map((item) => (
        <li className="cart-product-li hvr-shadow flex" key={item._id}>
          <div className="cb center">
            <FormControlLabel
              className="checkbox center"
              label
              control={
                item.selected ? (
                  <Checkbox checked={true} />
                ) : (
                  <Checkbox checked={false} />
                )
              }
              onChange={handleSelect}
              value={item._id}
            />
          </div>
          <Link className="center" to={`/product/${item.product._id}`}>
            <img
              className="cart-img"
              src={item.product.images[0]["url"]}
              alt={item.product.title}
            />
          </Link>
          <ul className="cart-item-details flex column">
            <li className="bold title">
              <Link to={`/product/${item.product._id}`}>
                {item.product.title}
              </Link>
            </li>
            <li>
              <span className="cart-item-grid">Size:</span>
              <span>{item.size}</span>
            </li>
            <li>
              <label>
                <span className="cart-item-grid">QTY:</span>
                <select
                  name="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleQuantity(e, item._id)}
                >
                  {qtyOptions.map((qty) => (
                    <option value={qty} key={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
              </label>
            </li>
            <li className="bolder">${item.product.price * item.quantity}</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default CartListing;
