import ErrorIcon from "@mui/icons-material/Error";
import SignalWifiStatusbarConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4";
import "./styles.css";

type Props = {
  heading?: string;
};

const Error = ({ heading = "Something went wrong" }: Props) => {
  return (
    //
    <div className="center" aria-errormessage="error-heading">
      {heading == "Network Error" ? (
        <SignalWifiStatusbarConnectedNoInternet4Icon sx={{ fontSize: 40 }} />
      ) : (
        <ErrorIcon sx={{ fontSize: 40 }} />
      )}
      <h1 id="error-heading">{heading}</h1>
    </div>
  );
};

export default Error;
