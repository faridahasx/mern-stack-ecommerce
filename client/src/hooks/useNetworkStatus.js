import { useEffect, useState } from "react";
const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
        };
        window.addEventListener("online", handleStatusChange);
        window.addEventListener("offline", handleStatusChange);
        return () => {
            window.removeEventListener("online", handleStatusChange);
            window.removeEventListener("offline", handleStatusChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return isOnline;
};
export default useNetworkStatus;
