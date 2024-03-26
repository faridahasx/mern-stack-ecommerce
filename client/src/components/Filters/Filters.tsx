import "./Filters.css";
import { useState, FormEvent, MouseEvent, MouseEventHandler } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterList } from "@mui/icons-material";
import { filterValues } from "../../assets/constants";
import { Filters as FiltersType } from "../../assets/types";
import SubmitButton from "../buttons/SubmitButton";
import ClearButton from "../buttons/ClearButton";
import OpenFieldsButton from "./OpenFieldsButton";
import Fields from "./Fields";
import PriceFilterField from "./PriceFilter";
import FormDialog from "../form-dialog/FormDialog";

type Props = {
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
  closeModal: Function;
};

const Filters = ({ handleCloseModal, closeModal }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<FiltersType>({
    category: searchParams.get("category")?.split(",") ?? [],
    sleeve: searchParams.get("sleeve")?.split(",") ?? [],
    color: searchParams.get("color")?.split(",") ?? [],
    size: searchParams.get("size")?.split(",") ?? [],
  });

  const [priceFilter, setPriceFilter] = useState({
    min: Number(searchParams.get("min")) | 0,
    max: Number(searchParams.get("max")) | 0,
  });
  const [openFilter, setOpenFilter] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filters.category.length
      ? searchParams.set("category", filters.category.join(","))
      : searchParams.delete("category");
    filters.sleeve.length
      ? searchParams.set("sleeve", filters.sleeve.join(","))
      : searchParams.delete("sleeve");
    filters.color.length
      ? searchParams.set("color", filters.color.join(","))
      : searchParams.delete("color");
    filters.size.length
      ? searchParams.set("size", filters.size.join(","))
      : searchParams.delete("size");
    Number(priceFilter.min) > 0
      ? searchParams.set("min", String(priceFilter.min))
      : searchParams.delete("min");
    Number(priceFilter.max) > 0
      ? searchParams.set("max", String(priceFilter.max))
      : searchParams.delete("max");
    setSearchParams(searchParams);
    closeModal();
  };

  const handleClearFilters = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilters({ category: [], sleeve: [], color: [], size: [] });
    setPriceFilter({ min: 0, max: 0 });
  };

  return (
    <FormDialog
      handleClose={handleCloseModal}
      handleSubmit={handleSubmit}
      Icon={<FilterList />}
      legend="Filters"
    >
      <div id="filters">
        {Object.keys(filterValues).map((filterName, index) => (
          <fieldset key={index}>
            <OpenFieldsButton
              filterName={filterName}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
            />
            {openFilter === filterName &&
              (filterName !== "price" ? (
                <Fields
                  filters={filters}
                  setFilters={setFilters}
                  filterName={filterName}
                />
              ) : (
                <PriceFilterField
                  priceFilter={priceFilter}
                  setPriceFilter={setPriceFilter}
                />
              ))}
          </fieldset>
        ))}
      </div>
      <div className="flex" id="filters-bottom">
        <SubmitButton type="submit">Apply</SubmitButton>
        <ClearButton onClick={handleClearFilters}>Clear</ClearButton>
      </div>
    </FormDialog>
  );
};

export default Filters;
