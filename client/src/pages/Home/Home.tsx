import Layout from "../../components/Layout";
import CateogoriesSlider from "../../components/home/CateogoriesSlider";
import Banner from "../../components/home/Banner";
import ProductsListing from "../../components/product-listing/ProductsListing";

const Home = () => {
  return (
    <Layout>
      <CateogoriesSlider />
      <Banner heading="Popular Products" />
      <ProductsListing />
    </Layout>
  );
};

export default Home;
