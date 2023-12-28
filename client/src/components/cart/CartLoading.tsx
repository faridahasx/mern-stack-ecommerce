const CartLoading = () => {
  return (
    <div className="cart-products-container center column">
      {[1, 2, 3].map((item) => (
        <span className="cart-product-li flex" key={item}></span>
      ))}
    </div>
  );
};

export default CartLoading;
