import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Slider.css";
import { useMemo, useRef, useState } from "react";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, FiberManualRecord, } from "@mui/icons-material";
import useKeyDownListener from "../../hooks/useKeydownListener";
import useElementOnScreen from "../../hooks/useElementOnScreen";
const Slider = ({ children, sliderLength }) => {
    const [index, setIndex] = useState(0);
    const [transformVal, setTransformVal] = useState("0%");
    const members = useMemo(() => new Array(sliderLength).fill(1), [sliderLength]);
    // Refs
    const ref = useRef(null);
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    }, ref);
    const handleKeyDown = (e) => {
        if (isVisible && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
            handleSlide(e.key);
        }
    };
    useKeyDownListener(handleKeyDown);
    const handleShortcutClick = (index) => {
        setIndex(index);
        handleSliderTransformation(index);
    };
    const handleSliderTransformation = (index) => setTransformVal(index === 0 ? `0%` : `-${index}00%`);
    const handleSlide = (direction) => {
        if (direction === "ArrowLeft") {
            if (index > 0) {
                setIndex(index - 1);
                handleSliderTransformation(index - 1);
            }
        }
        else {
            if (index < sliderLength - 1) {
                setIndex(index + 1);
                handleSliderTransformation(index + 1);
            }
        }
    };
    return (_jsxs("div", { className: "slider", children: [_jsx("button", { ref: containerRef, className: `slider-btn left ${index > 0 ? " active-slider-btn" : ""}`, onClick: () => handleSlide("ArrowLeft"), disabled: index === 0, children: _jsx(ArrowBackIosOutlined, {}) }), _jsx("button", { className: `slider-btn right ${index < sliderLength - 1 ? " active-slider-btn" : ""}`, onClick: () => handleSlide("ArrowRight"), disabled: index === sliderLength - 1, children: _jsx(ArrowForwardIosOutlined, {}) }), _jsx("div", { className: "slider-content", style: { transform: `translateX(${transformVal})` }, children: children }), _jsx("div", { id: "slider-bottom-controls", className: "center", children: _jsx("ul", { className: "center", children: members.map((i, indx) => (_jsx("li", { children: _jsx("button", { onClick: () => handleShortcutClick(indx), children: _jsx(FiberManualRecord, { className: indx === index ? "active-pcb" : "deactive-pcb" }) }) }, indx))) }) })] }));
};
export default Slider;
