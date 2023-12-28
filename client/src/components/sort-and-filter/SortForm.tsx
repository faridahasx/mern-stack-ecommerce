import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Done, Sort, CloseOutlined } from "@mui/icons-material";
import { sortValues } from "../../assets/constants";

type Props = {
  sort: String;
  setSort: Function;
  setOpenModal: Function;
};

const SortForm = ({ sort, setSort, setOpenModal }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSorting = (e: ChangeEvent<{}>) => {
    let value = (e.target as HTMLInputElement).value;
    setSort(value);
    searchParams.set("sort", value);
    setSearchParams(searchParams);
    setOpenModal("");
  };

  return (
    <form
      className="sf-form center column"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex sf-form-top">
        <span className="flex sf-legend-container">
          <span className="center legend-icon">
            <Sort />
          </span>
          <legend className="bolder">Sort By:</legend>
        </span>
        <button className="icon" onClick={() => setOpenModal("")}>
          <CloseOutlined />
        </button>
      </div>
      <div className="center column sf-values">
        {Object.keys(sortValues).map((val, valInd) => (
          <FormControlLabel
            className="sort-value flex hover"
            // onChange={() => setOpenModal("")}
            onChange={handleSorting}
            value={sortValues[val]}
            label={val}
            key={valInd}
            control={
              sort !== sortValues[val] ? (
                <Checkbox
                  icon={<span className="icon"></span>}
                  checked={false}
                />
              ) : (
                <Checkbox
                  checkedIcon={
                    <span className="icon">
                      <Done />
                    </span>
                  }
                  checked={true}
                />
              )
            }
          />
        ))}
      </div>
    </form>
  );
};

export default SortForm;
