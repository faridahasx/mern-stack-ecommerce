import { Component, ErrorInfo, ReactNode } from "react";
import Error from "./Error";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("ERROR_BOUNDARY_CATCH:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Error heading="Something went wrong." />;
    }
    return this.props.children;
  }
}
