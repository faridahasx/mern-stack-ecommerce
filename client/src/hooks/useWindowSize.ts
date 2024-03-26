import { useState, useLayoutEffect } from "react";

function useWindowSize() {
  useLayoutEffect(() => {
    const handleResize = () => {
      let root = document.querySelector(":root");
      (root as HTMLElement).style.setProperty(
        "--vh",
        window.innerHeight / 100 + "px"
      );
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
}

export default useWindowSize;
