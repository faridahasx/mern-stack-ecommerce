import "./SortForm.css";
import { ChangeEvent, MouseEventHandler, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Done, Sort } from "@mui/icons-material";
import { sortValues } from "../../assets/constants";
import FormDialog from "../form-dialog/FormDialog";

type Props = {
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
  closeModal: Function;
};

const SortForm = ({ handleCloseModal, closeModal }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const handleSorting = (e: ChangeEvent<{}>) => {
    let value = (e.target as HTMLInputElement).value;
    setSort(value);
    searchParams.set("sort", value);
    setSearchParams(searchParams);
    closeModal();
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <FormDialog
      handleClose={handleCloseModal}
      handleSubmit={handleSubmit}
      Icon={<Sort />}
      legend="Sort By:"
    >
      {Object.keys(sortValues).map((val, valInd) => (
        <FormControlLabel
          className="sort-value flex hover"
          onChange={handleSorting}
          value={sortValues[val]}
          label={val}
          key={valInd}
          control={
            sort !== sortValues[val] ? (
              <Checkbox icon={<span className="icon"></span>} checked={false} />
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
    </FormDialog>
  );
};

export default SortForm;
