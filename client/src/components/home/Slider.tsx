import { useState } from "react";
import { Link, createSearchParams } from "react-router-dom";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { homeSliderList } from "../../assets/constants";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleSliderTransition = (index: Number) => {
    (document.querySelector(":root") as HTMLElement).style.setProperty(
      "--trX",
      index === 0 ? `0%` : `-${index}00%`
    );
  };

  const handleSlide = (direction: String) => {
    if (direction === "left") {
      if (index > 0) {
        setIndex(index - 1);
        handleSliderTransition(index - 1);
      }
    } else {
      if (index < homeSliderList.length - 1) {
        setIndex(index + 1);
        handleSliderTransition(index + 1);
      }
    }
  };

  return (
    <section id="home-slider" className="flex">
      <button
        className={`slider-btn left ${index > 0 ? " asb" : ""}`}
        onClick={() => handleSlide("left")}
        disabled={index === 0}
      >
        <ArrowBackIosOutlined />
      </button>
      <button
        className={`slider-btn right ${
          index < homeSliderList.length - 1 ? " asb" : ""
        }`}
        onClick={() => handleSlide("right")}
        disabled={index === homeSliderList.length - 1}
      >
        <ArrowForwardIosOutlined />
      </button>
      <ul className="slider-ul flex">
        {homeSliderList.map((item, ind) => (
          <li className="center" key={ind}>
            <Link
              className="flex"
              to={{
                pathname: "/products",
                search: `${createSearchParams({
                  category: item.link,
                  page: "1",
                })}`,
              }}
            >
              <div className="home-slider-img-wrapper center">
                <img
                  className="home-slider-img"
                  src={item.image.url}
                  alt={item.heading}
                />
              </div>
              <div className="center home-slider-heading-wrapper">
                <div className="flex">
                  <h2 className="center shadow text-overflow">
                    {item.heading}
                  </h2>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Slider;
