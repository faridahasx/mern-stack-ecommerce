import { useState, useEffect } from "react";
import { Product } from "../../assets/types";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreTypes";
import { axiosBaseInstance } from "../../utils/axiosInstance";
// Components
import Layout from "../../components/Layout";
import LoadingProduct from "../../components/single-product/LoadingProduct";
import LoadedProduct from "../../components/single-product/LoadedProduct";
import Error from "../../components/error/Error";
// styles
import "./styles.css";

const SingleProduct = () => {
  const transition = useAppSelector(
    (state) => state.transition.isTransitioning
  );
  const dispatch = useAppDispatch();
  const isOnline = useNetworkStatus();
  const [updatedView, setUpdatedView] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const productId = location.pathname.split("/")[2];
    const updateProductViews = async () => {
      if (!updatedView) {
        setUpdatedView(true);
        try {
          await axiosBaseInstance.patch(`/api/products/${productId}`);
        } catch (err) {
          setUpdatedView(false);
        }
      }
    };
    const fetchProduct = async () => {
      dispatch({ type: "TRANSITION", payload: true });
      try {
        const res = await axiosBaseInstance.get(`/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        if (!isOnline) {
          setError("Network Error");
        } else {
          setError("Product Not Found");
        }
      }
      dispatch({ type: "TRANSITION", payload: false });
    };
    if (isOnline && !product) {
      fetchProduct();
      updateProductViews();
    }
  }, [location, isOnline, product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Layout>
      {error && transition === false ? (
        <Error heading={error} />
      ) : (
        <main className="center">
          {transition && !product ? (
            <LoadingProduct />
          ) : (
            product && <LoadedProduct product={product} />
          )}
        </main>
      )}
    </Layout>
  );
};

export default SingleProduct;
