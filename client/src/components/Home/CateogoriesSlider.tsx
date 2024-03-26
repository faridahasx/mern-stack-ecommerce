import "./CateogoriesSlider.css";
import { Link, createSearchParams } from "react-router-dom";
import { homeSliderList } from "../../assets/constants";
import Slider from "../slider/Slider";

const CateogoriesSlider = () => {
  return (
    <Slider sliderLength={homeSliderList.length}>
      <ul className="cat-slider-ul flex">
        {homeSliderList.map((item, ind) => (
          <li className="category-slider-li center" key={ind}>
            <Link
              className="flex category-slider-link"
              target="_blank"
              to={{
                pathname: "/products",
                search: `${createSearchParams({
                  category: item.link,
                  page: "1",
                })}`,
              }}
            >
              <div className="category-img-wrapper center">
                <img
                  className="category-img"
                  src={item.image.url}
                  alt={item.heading}
                />
              </div>
              <div className="center slider-heading-wrapper">
                <div className="flex">
                  <h2 className="category-slider-heading center shadow text-overflow">
                    {item.heading}
                  </h2>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Slider>
  );
};

export default CateogoriesSlider;
