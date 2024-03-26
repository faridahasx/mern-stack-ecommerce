import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { CircularProgress } from "@mui/material";
import Error from "./Error/Error";
const RenderFetchedData = ({ isLoading, isOnline, isError, emptyResultMessage, data, children, }) => {
    return (_jsx(_Fragment, { children: isError && !isLoading && !data ? (_jsx(Error, {})) : data !== null && data.length === 0 ? (_jsx("h2", { className: "empty-products center", children: emptyResultMessage })) : data === null ? (!isOnline ? (_jsx(Error, { heading: "No internet" })) : (_jsx(CircularProgress, {}))) : (children) }));
};
export default RenderFetchedData;
