import { jsx as _jsx } from "react/jsx-runtime";
import "./ImageSlider.css";
import Slider from "../Slider/Slider";
const ImageSlider = ({ images }) => {
    return (_jsx(Slider, { sliderLength: images.length, children: _jsx("ul", { className: "image-ul flex", children: images.map((image, indx) => (_jsx("li", { className: "image-li flex", children: _jsx("img", { className: "slider-img", alt: "Product", src: image.url }) }, indx))) }) }));
};
export default ImageSlider;
