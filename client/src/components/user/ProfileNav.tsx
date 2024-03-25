import { Home, Store, LocalShipping, Logout } from "@mui/icons-material";
import { axiosInstance } from "../../utils/axiosInstance";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { ButtonProgress } from "../Loading/Loading";
import useClearCredentials from "../../hooks/useClearCredentials";
import "./ProfileNav.css";

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
  const { executeServerRequest, loading } = useMakeNetworkRequest();
  const clearCredentials = useClearCredentials();

  const handleLogout = () => {
    executeServerRequest(async () => {
      await axiosInstance.get("/api/auth/logout");
      clearCredentials();
    });
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
            disabled={loading}
          >
            <span className="center">
              <span className="center">
                {loading ? <ButtonProgress /> : <Logout />}
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
