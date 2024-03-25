import Layout from "../../components/Layout";
import CateogoriesSlider from "../../components/Home/CateogoriesSlider";
import Banner from "../../components/Home/Banner";
import ProductsListing from "../../components/ProductListing/ProductsListing";

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
