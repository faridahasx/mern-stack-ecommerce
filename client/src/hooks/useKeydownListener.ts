// External imports
import { useEffect } from "react";

// Custom React hook for handling keydown events
const useKeyDownListener = (callback: Function) => {
  useEffect(() => {
    // Function to handle keydown events and invoke the provided callback
    const handleKeyDown = (event: KeyboardEvent) => {
      callback(event);
    };
    // Add event listener only if ignore flag is false
    document.addEventListener("keydown", handleKeyDown);
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      // Remove event listener only if ignore flag is false
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};

export default useKeyDownListener;
