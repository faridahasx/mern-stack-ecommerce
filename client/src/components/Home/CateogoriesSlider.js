import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./CateogoriesSlider.css";
import { Link, createSearchParams } from "react-router-dom";
import { homeSliderList } from "../../assets/constants";
import Slider from "../Slider/Slider";
const CateogoriesSlider = () => {
    return (_jsx(Slider, { sliderLength: homeSliderList.length, children: _jsx("ul", { className: "cat-slider-ul flex", children: homeSliderList.map((item, ind) => (_jsx("li", { className: "category-slider-li center", children: _jsxs(Link, { className: "flex category-slider-link", target: "_blank", to: {
                        pathname: "/products",
                        search: `${createSearchParams({
                            category: item.link,
                            page: "1",
                        })}`,
                    }, children: [_jsx("div", { className: "category-img-wrapper center", children: _jsx("img", { className: "category-img", src: item.image.url, alt: item.heading }) }), _jsx("div", { className: "center slider-heading-wrapper", children: _jsx("div", { className: "flex", children: _jsx("h2", { className: "category-slider-heading center shadow text-overflow", children: item.heading }) }) })] }) }, ind))) }) }));
};
export default CateogoriesSlider;
