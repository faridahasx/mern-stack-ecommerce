import "./Loading.css";
import { CircularProgress, LinearProgress } from "@mui/material";

const Transition = () => {
  return (
    <div className="transition">
      <LinearProgress />
    </div>
  );
};

const ButtonProgress = () => {
  return <CircularProgress sx={{ color: "white" }} className="btn-progress" />;
};

export { Transition, ButtonProgress };
