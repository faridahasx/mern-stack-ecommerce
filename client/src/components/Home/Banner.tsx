import "./Banner.css";
import { Link } from "react-router-dom";

// Popular products
type Props = {
  heading: string;
};

const Banner = ({ heading }: Props) => {
  return (
    <div id="banner" className="center">
      <Link className="center" to={"/products"}>
        <h1 className="text-overflow">{heading}</h1>
      </Link>
    </div>
  );
};

export default Banner;
