import { useState, useLayoutEffect } from "react";

function useWindowSize() {
  const [dimensions, setDimension] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    previousWidth: 0,
    previousHeight: 0,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setDimension({
        previousHeight: dimensions.height,
        previousWidth: dimensions.width,
        height: window.innerHeight,
        width: window.innerWidth,
      });

      let root = document.querySelector(":root");
      (root as HTMLElement).style.setProperty(
        "--vh",
        window.innerHeight / 100 + "px"
      );
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dimensions;
}

export default useWindowSize;
