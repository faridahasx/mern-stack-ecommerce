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

const Progress = () => {
  return <CircularProgress sx={{ color: "slategrey" }} />;
};

const PageLoading = () => {
  return (
    <div className="loading-page center">
      <Progress />
    </div>
  );
};

export { Transition, ButtonProgress, PageLoading, Progress };
