import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from "react";
import Error from "./Error";
export default class ErrorBoundary extends Component {
    state = { hasError: false };
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log("ERROR_BOUNDARY_CATCH:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("section", { className: "center err-cntr", children: _jsx(Error, {}) }));
        }
        return this.props.children;
    }
}
