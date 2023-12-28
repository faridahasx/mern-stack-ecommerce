import { ChangeEvent } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Done } from "@mui/icons-material";
import { FilterKey, Filters } from "../../../assets/types";
import { filterValues } from "../../../assets/constants";

type Props = {
  filters: Filters;
  setFilters: Function;
  filterName: string;
};

const FilterValuesField = ({ filters, setFilters, filterName }: Props) => {
  const handleFiltersChange = (e: ChangeEvent<{}>) => {
    e.preventDefault();
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    let filterNameKey = name as FilterKey;
    const index = filters[filterNameKey].indexOf(value);
    setFilters({
      ...filters,
      [name]:
        index === -1
          ? [...filters[filterNameKey], value]
          : filters[filterNameKey].filter((item) => item !== value),
    });
  };

  return (
    <div className="filter-values flex column">
      {filterValues[filterName].map((val: string, valInd: number) => (
        <FormControlLabel
          className="flex hover"
          onChange={handleFiltersChange}
          key={valInd}
          label={val}
          name={filterName}
          value={val}
          control={
            filters[filterName as FilterKey].indexOf(val) === -1 ? (
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
    </div>
  );
};

export default FilterValuesField;
