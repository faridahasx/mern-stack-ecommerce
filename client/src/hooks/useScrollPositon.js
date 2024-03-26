import { useState, useLayoutEffect } from "react";
function useScrollPosition() {
    const [scrollY, setScrollY] = useState(window.scrollY);
    useLayoutEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return scrollY;
}
export default useScrollPosition;
