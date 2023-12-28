import { startTransition, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
// Assets
import { Product } from "../../assets/types";
// Custom hooks
import useElementOnScreen from "../../hooks/useElementOnScreen";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreTypes";
// Utils
import { axiosBaseInstance } from "../../utils/axiosInstance";
// Components
import ProductLoading from "./ProductCardLoading";
import ProductCard from "./ProductCard";
// Styles
import "./styles.css";

const productLimit = 13;
let arr = [1, 2, 3, 4, 5, 6];

const ProductsListing = () => {
  const transition = useAppSelector(
    (state) => state.transition.isTransitioning
  );
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
  const isOnline = useNetworkStatus();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [length, setLength] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchQueryString, setSearchQueryString] = useState("");

  // Fetch  and set products
  const updateProducts = async (
    ignore: { value: boolean },
    searchQuery: string,
    pageIndex: number
  ) => {
    dispatch({ type: "TRANSITION", payload: true });
    try {
      let requestQuery = `/api/products?page=${pageIndex}&limit=${productLimit}&${searchQuery}`;

      const res = await axiosBaseInstance.get(requestQuery);
      let result =
        res.data.length === productLimit
          ? res.data.products.slice(0, res.data.length - 1)
          : res.data.products;
      if (!ignore.value) {
        startTransition(() => {
          if (pageIndex === 1) {
            setInitialLoad(true);
            setLength(res.data.length);
            window.scrollTo(0, 0);
          }
          setPageIndex(pageIndex + 1);
          setProducts((products) =>
            pageIndex === 1
              ? [...result]
              : products !== null
              ? products.slice().concat(result)
              : products
          );
          setLoadMore(res.data.length === productLimit ? true : false);
        });
      }
    } catch {}
    dispatch({ type: "TRANSITION", payload: false });
  };

  useEffect(() => {
    let ignore = { value: false };
    const getSearchQuery = (): string => {
      const category = searchParams.get("category");
      const sleeve = searchParams.get("sleeve");
      const color = searchParams.get("color");
      const size = searchParams.get("size");
      const sort = searchParams.get("sort");
      const minPrice = searchParams.get("min");
      const maxPrice = searchParams.get("max");
      const searchInput = searchParams.get("search");
      return `${searchInput ? "&title[regex]=" + searchInput : ""}${
        category && category !== "All" ? "&category[in]=" + category : ""
      }${sleeve ? "&sleeve[in]=" + sleeve : ""}${
        color ? "&color[in]=" + color : ""
      }${size ? "&size[in]=" + size : ""}${sort ? "&" + sort : ""}${
        minPrice ? "&price[gte]=" + minPrice : ""
      }${maxPrice ? "&[price][lte]=" + maxPrice : ""}`;
    };
    let searchQuery = getSearchQuery();
    setSearchQueryString(searchQuery);
    updateProducts(ignore, searchQuery, 1);
    return () => {
      ignore.value = true;
    };
  }, [location]);

  useEffect(() => {
    (isVisible || isOnline) &&
      !transition &&
      loadMore &&
      initialLoad &&
      updateProducts({ value: false }, searchQueryString, pageIndex);
  }, [isVisible, isOnline]);

  return (
    <section className="center column">
      {!transition && initialLoad && length === 0 ? (
        <h2 className="empty-products center">No Match</h2>
      ) : (
        // products && (
        <ul className="products-ul flex">
          {products === null
            ? arr.map((item) => <ProductLoading key={item} />)
            : products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  products={products}
                  setProducts={setProducts}
                />
              ))}
        </ul>
      )}
      {loadMore ? (
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
