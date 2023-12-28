import Layout from "../../components/Layout";
import SortFilterNav from "../../components/sort-and-filter/SortFilterNav";
import ProductsListing from "../../components/products-listing/ProductsListing";

const Products = () => {
  return (
    <Layout>
      <main>
        <SortFilterNav />
        <ProductsListing />
      </main>
    </Layout>
  );
};

export default Products;
