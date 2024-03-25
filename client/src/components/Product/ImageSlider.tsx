import "./ImageSlider.css";
import { image } from "../../assets/types";
import Slider from "../Slider/Slider";

type Props = {
  images: image[];
};

const ImageSlider = ({ images }: Props) => {
  return (
    <Slider sliderLength={images.length}>
      <ul className="image-ul flex">
        {images.map((image, indx) => (
          <li className="image-li flex" key={indx}>
            <img className="slider-img" alt="Product" src={image.url} />
          </li>
        ))}
      </ul>
    </Slider>
  );
};

export default ImageSlider;
