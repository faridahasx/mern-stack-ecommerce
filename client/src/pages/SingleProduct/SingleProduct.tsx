import { useState, useEffect } from "react";
import { Product as ProductType } from "../../assets/types";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreTypes";
import { axiosBaseInstance } from "../../utils/axiosInstance";
// Components
import Layout from "../../components/Layout";
import Product from "../../components/Product/Product";
import Error from "../../components/Error/Error";
// styles
import { CircularProgress } from "@mui/material";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { useLocation } from "react-router-dom";

const SingleProduct = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isOnline = useNetworkStatus();
  const [updatedView, setUpdatedView] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  // const [error, setError] = useState("");
  const { executeServerRequest, loading, error } = useMakeNetworkRequest();
  const productId = location.pathname.split("/")[2];

  // Update product views
  useEffect(() => {
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
    updateProductViews();
  }, [location]);

  useEffect(() => {
    !product &&
      executeServerRequest(async () => {
        const res = await axiosBaseInstance.get(`/api/products/${productId}`);
        setProduct(res.data);
      });
  }, [location, isOnline]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Layout>
      {loading && !product ? (
        <CircularProgress />
      ) : product ? (
        <Product product={product} />
      ) : (
        error && <Error />
      )}
    </Layout>
  );
};

export default SingleProduct;
