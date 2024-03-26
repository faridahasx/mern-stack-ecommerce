import "./ProductsListing.css";
import { startTransition, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Product } from "../../assets/types";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import getSearchQuery from "../../utils/getSearchQuery";
import { axiosBaseInstance } from "../../utils/axiosInstance";
import ProductCard from "./ProductCard";
import { Transition } from "../loading/Loading";
import RenderFetchedData from "../RenderFetchedData";

const productLimit = 12;

const ProductsListing = () => {
  const location = useLocation();

  // Refs
  const ref = useRef<HTMLDivElement>(null);
  const [containerRef, isVisible] = useElementOnScreen(
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    },
    ref
  );
  // Initialize state
  const [products, setProducts] = useState<Array<Product> | null>(null);
  const [loadMore, setLoadMore] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchQueryString, setSearchQueryString] = useState("");
  const { executeServerRequest, loading, error, isOnline } =
    useMakeNetworkRequest();

  // Fetch  and set products
  const updateProducts = async (
    ignore: { value: boolean },
    searchQuery: string,
    pageIndex: number
  ) => {
    let requestQuery = `/api/products?page=${pageIndex}&limit=${productLimit}&${searchQuery}`;
    executeServerRequest(async () => {
      const res = await axiosBaseInstance.get(requestQuery);
      let result = res.data.products;

      if (!ignore.value) {
        startTransition(() => {
          if (pageIndex === 1) {
            setInitialLoad(true);
            window.scrollTo(0, 0);
          }
          setPageIndex(pageIndex + 1);
          setProducts((products) =>
            pageIndex === 1
              ? [...result]
              : products !== null
              ? [...products, ...result]
              : products
          );
          setLoadMore(res.data.length === productLimit ? true : false);
        });
      }
    });
  };

  useEffect(() => {
    let ignore = { value: false };
    let searchQuery = getSearchQuery();
    setSearchQueryString(searchQuery);
    updateProducts(ignore, searchQuery, 1);
    return () => {
      ignore.value = true;
    };
  }, [location]);

  useEffect(() => {
    isVisible &&
      !loading &&
      loadMore &&
      initialLoad &&
      updateProducts({ value: false }, searchQueryString, pageIndex);
  }, [isVisible, isOnline]);

  return (
    <section className="products-list center column">
      {loading && products !== null && <Transition />}
      <RenderFetchedData
        isLoading={loading}
        isOnline={isOnline}
        isError={error}
        emptyResultMessage="No Match"
        data={products}
      >
        {products && (
          <ul className="products-ul flex">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                products={products}
                setProducts={setProducts}
              />
            ))}
          </ul>
        )}
      </RenderFetchedData>
      {loadMore && isOnline ? (
        <div id="products-progress" className="center" ref={containerRef}>
          <CircularProgress />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default ProductsListing;
