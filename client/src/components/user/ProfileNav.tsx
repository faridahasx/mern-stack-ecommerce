import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Store, LocalShipping, Logout } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { getAuthInstance } from "../../utils/axiosInstance";

const userNav = [
  { title: "Address Book", icon: <Home /> },
  { title: "My Orders", icon: <Store /> },
  { title: "Track My Orders", icon: <LocalShipping /> },
];

type Props = {
  setCurrentWindow: Function;
  currentWindow: string;
};

const ProfileNav = ({ setCurrentWindow, currentWindow }: Props) => {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutProcess, setLogoutProcess] = useState(false);

  const handleLogout = async () => {
    if (!isOnline) return;
    setLogoutProcess(true);
    try {
      const authInstance = await getAuthInstance();
      if (!authInstance) return navigate("/login");
      await authInstance.get("/api/auth/logout");
      localStorage.removeItem("firstLogin");
      dispatch({ type: "IS_LOGGED", payload: false });
      dispatch({ type: "IS_ADMIN", payload: false });
      navigate("/");
      dispatch({ type: "SUCCESS", payload: "Logged Out" });
    } catch (err: any) {
      err.response.data &&
        dispatch({ type: "ERROR", payload: err.response.data });
    }
    setLogoutProcess(false);
  };

  return (
    <nav id="profile-nav" className="flex">
      <ul id="profile-ul" className="flex column">
        {userNav.map((item, index) => (
          <li key={index}>
            <button
              className="center"
              title={item.title}
              onClick={() => setCurrentWindow(item.title)}
              disabled={item.title === currentWindow}
            >
              <span className="center">
                <span
                  className={`center ${item.title !== currentWindow && "icon"}`}
                >
                  {item.icon}
                </span>
                <span className="hidden">{item.title}</span>
              </span>
            </button>
          </li>
        ))}
        <li>
          <button
            className="center"
            onClick={handleLogout}
            title="Logout"
            disabled={logoutProcess}
          >
            <span className="center">
              <span className="center">
                <Logout />
              </span>
              <span className="hidden center">Logout</span>
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileNav;
