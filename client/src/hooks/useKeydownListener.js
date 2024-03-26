// External imports
import { useEffect } from "react";
const useKeyDownListener = (callback) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            callback(event);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [callback]);
};
export default useKeyDownListener;
