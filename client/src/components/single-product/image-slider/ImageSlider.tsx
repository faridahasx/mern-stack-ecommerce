import { useState, useEffect } from "react";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
  FiberManualRecord,
  Close,
} from "@mui/icons-material";
import { image } from "../../../assets/types";
import useWindowSize from "../../../hooks/useWindowSize";
import "./styles.css";

type Props = {
  images: image[];
};

const ImageSlider = ({ images }: Props) => {
  const dimensions = useWindowSize();
  const [zoomImgStyle, setZoomImgStyle] = useState({});
  const [index, setIndex] = useState(0);
  const [openImg, setOpenImg] = useState(false);

  useEffect(() => {
    let size =
      dimensions.width >= dimensions.height
        ? dimensions.height
        : dimensions.width;
    setZoomImgStyle(
      openImg
        ? {
            width: `${size - 3}px`,
            "min-width": `${size}px`,
            height: `${size - 3}px`,
            "min-height": `${size - 3}px`,
          }
        : {}
    );
  }, [dimensions, openImg]);

  const toggleOpenImages = () => {
    setOpenImg(!openImg);
  };

  const slideImages = (direction: String) => {
    if (direction === "left") {
      return index > 0 && setIndex(index - 1);
    }
    index < images.length - 1 && setIndex(index + 1);
  };

  useEffect(() => {
    let root = document.querySelector(":root");
    (root as HTMLElement).style.setProperty(
      "--ItrX",
      index === 0 ? `0%` : `-${index}00%`
    );
  }, [index]);

  return (
    <section
      className={`product-slider flex ${openImg ? " zoom-product-slider" : ""}`}
    >
      {openImg && (
        <button id="close-btn" title="Close" onClick={toggleOpenImages}>
          <Close />
        </button>
      )}
      <button
        className={`slider-btn left ${index > 0 ? " active-slider-btn" : ""}`}
        onClick={() => slideImages("left")}
        disabled={index === 0}
      >
        <ArrowBackIosOutlined />
      </button>
      <button
        className={`slider-btn right ${
          index < images.length - 1 ? " active-slider-btn" : ""
        }`}
        onClick={() => slideImages("right")}
        disabled={index === images.length - 1}
      >
        <ArrowForwardIosOutlined />
      </button>

      <ul
        className={`img-slider-ul sp-ul flex ${
          openImg ? " zoom-slider-ul" : ""
        }`}
      >
        {images.map((image, indx) => (
          <li
            className={`slider-li flex ${openImg ? " zoom-slider-li" : ""}`}
            key={indx}
            onClick={() => setOpenImg(true)}
          >
            <img
              className="slider-img"
              alt="Product"
              style={zoomImgStyle}
              src={image.url}
            />
          </li>
        ))}
      </ul>
      <div id="product-bottom-cntr" className="center">
        <ul className="center">
          {images.map((i, indx) => (
            <li key={indx}>
              <button onClick={() => setIndex(indx)}>
                <FiberManualRecord
                  className={indx === index ? "" : "deactive-pcb"}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ImageSlider;
