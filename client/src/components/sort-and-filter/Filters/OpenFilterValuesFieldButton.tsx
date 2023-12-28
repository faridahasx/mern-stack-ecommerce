import { MouseEvent } from "react";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

type Props = {
  openFilter: String;
  setOpenFilter: Function;
  filterName: String;
};

const OpenFilterValuesFieldButton = ({
  openFilter,
  setOpenFilter,
  filterName,
}: Props) => {
  const toggleOpenFilter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openFilter === filterName ? setOpenFilter("") : setOpenFilter(filterName);
  };
  let buttonName = filterName.charAt(0).toUpperCase() + filterName.slice(1);

  return (
    <button
      className={`ofv-btn hover center ${
        openFilter === filterName && " shadow"
      }`}
      onClick={toggleOpenFilter}
    >
      {buttonName}
      <span className="center">
        {openFilter === filterName ? (
          <KeyboardArrowUp />
        ) : (
          <KeyboardArrowDown />
        )}
      </span>
    </button>
  );
};

export default OpenFilterValuesFieldButton;
