// External imports
import { useEffect } from "react";

const useKeyDownListener = (callback: Function) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      callback(event);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};

export default useKeyDownListener;
