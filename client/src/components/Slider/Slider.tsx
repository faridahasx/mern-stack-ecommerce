import "./Slider.css";
import { ReactNode, useMemo, useRef, useState } from "react";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
  FiberManualRecord,
} from "@mui/icons-material";

import useKeyDownListener from "../../hooks/useKeydownListener";
import useElementOnScreen from "../../hooks/useElementOnScreen";

type Props = {
  children: ReactNode;
  sliderLength: number;
};

const Slider = ({ children, sliderLength }: Props) => {
  const [index, setIndex] = useState(0);
  const [transformVal, setTransformVal] = useState("0%");
  const members = useMemo(
    () => new Array(sliderLength).fill(1),
    [sliderLength]
  );

  // Refs
  const ref = useRef<HTMLDivElement>(null);
  const [containerRef, isVisible] = useElementOnScreen(
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    },
    ref
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isVisible && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      handleSlide(e.key);
    }
  };

  useKeyDownListener(handleKeyDown);

  const handleShortcutClick = (index: number) => {
    setIndex(index);
    handleSliderTransformation(index);
  };

  const handleSliderTransformation = (index: number) =>
    setTransformVal(index === 0 ? `0%` : `-${index}00%`);

  const handleSlide = (direction: "ArrowLeft" | "ArrowRight") => {
    if (direction === "ArrowLeft") {
      if (index > 0) {
        setIndex(index - 1);
        handleSliderTransformation(index - 1);
      }
    } else {
      if (index < sliderLength - 1) {
        setIndex(index + 1);
        handleSliderTransformation(index + 1);
      }
    }
  };

  return (
    <div className="slider">
      <button
        ref={containerRef}
        className={`slider-btn left ${index > 0 ? " active-slider-btn" : ""}`}
        onClick={() => handleSlide("ArrowLeft")}
        disabled={index === 0}
      >
        <ArrowBackIosOutlined />
      </button>
      <button
        className={`slider-btn right ${
          index < sliderLength - 1 ? " active-slider-btn" : ""
        }`}
        onClick={() => handleSlide("ArrowRight")}
        disabled={index === sliderLength - 1}
      >
        <ArrowForwardIosOutlined />
      </button>
      <div
        className="slider-content"
        style={{ transform: `translateX(${transformVal})` }}
      >
        {children}
      </div>
      <div id="slider-bottom-controls" className="center">
        <ul className="center">
          {members.map((i, indx) => (
            <li key={indx}>
              <button onClick={() => handleShortcutClick(indx)}>
                <FiberManualRecord
                  className={indx === index ? "active-pcb" : "deactive-pcb"}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Slider;
