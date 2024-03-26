import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Product as ProductType } from "../../assets/types";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { axiosBaseInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import Product from "../../components/product/Product";
import Error from "../../components/error/Error";
import { Progress } from "../../components/loading/Loading";

const SingleProduct = () => {
  const location = useLocation();
  const [product, setProduct] = useState<ProductType | null>(null);
  const { executeServerRequest, loading, error, isOnline } =
    useMakeNetworkRequest();
  const productId = location.pathname.split("/")[2];

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
        <Progress />
      ) : product ? (
        <Product product={product} />
      ) : error ? (
        <Error heading="Not found" />
      ) : (
        !isOnline && <Error heading="No internet" />
      )}
    </Layout>
  );
};

export default SingleProduct;
