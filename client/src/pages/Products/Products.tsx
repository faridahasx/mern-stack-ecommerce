import Layout from "../../components/Layout";
import SortFilterNav from "../../components/sort-and-filters-nav/Nav";
import ProductsListing from "../../components/product-listing/ProductsListing";

const Products = () => {
  return (
    <Layout>
      <SortFilterNav />
      <ProductsListing />
    </Layout>
  );
};

export default Products;
