import Layout from "../../components/Layout";
import Slider from "../../components/home/Slider";
import ProductsHeading from "../../components/home/ProductsHeading";
import ProductsListing from "../../components/products-listing/ProductsListing";
import "./styles.css";

const Home = () => {
  return (
    <Layout>
      <main className="flex column">
        <Slider />
        <ProductsHeading />
        <ProductsListing />
      </main>
    </Layout>
  );
};

export default Home;
