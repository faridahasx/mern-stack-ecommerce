import { CircularProgress, LinearProgress } from "@mui/material";
import "./styles.css";

const Transition = () => {
  return (
    <div className="transition">
      <LinearProgress />
    </div>
  );
};

const ButtonProgress = () => {
  return <CircularProgress className="btn-progress" />;
};

export { Transition, ButtonProgress };
