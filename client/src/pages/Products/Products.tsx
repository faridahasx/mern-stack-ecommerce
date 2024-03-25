import Layout from "../../components/Layout";
import SortFilterNav from "../../components/SortAndFiltersNav/Nav";
import ProductsListing from "../../components/ProductListing/ProductsListing";

const Products = () => {
  return (
    <Layout>
      <SortFilterNav />
      <ProductsListing />
    </Layout>
  );
};

export default Products;
