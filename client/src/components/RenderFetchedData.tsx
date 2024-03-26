import { ReactNode } from "react";
import Error from "./error/Error";
import { Progress } from "./loading/Loading";

type Props = {
  isLoading: boolean;
  isOnline: boolean;
  isError: boolean;
  emptyResultMessage: string;
  data: any[] | null;
  children: ReactNode;
};

const RenderFetchedData = ({
  isLoading,
  isOnline,
  isError,
  emptyResultMessage,
  data,
  children,
}: Props) => {
  return (
    <>
      {isError && !isLoading && !data ? (
        <Error />
      ) : data !== null && data.length === 0 ? (
        <h2 className="empty-products center">{emptyResultMessage}</h2>
      ) : data === null ? (
        !isOnline ? (
          <Error heading="No internet" />
        ) : (
          <Progress />
        )
      ) : (
        children
      )}
    </>
  );
};

export default RenderFetchedData;
