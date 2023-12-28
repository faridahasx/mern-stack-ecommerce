import { useState, FormEvent, MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { CloseOutlined, FilterList } from "@mui/icons-material";
import { filterValues } from "../../../assets/constants";
import { Filters, PriceFilter } from "../../../assets/types";
import OpenFilterValuesFieldButton from "./OpenFilterValuesFieldButton";
import FilterValuesField from "./FilterValuesField";
import PriceFilterField from "./PriceFilterField";

type Props = {
  filters: Filters;
  setFilters: Function;
  setOpenModal: Function;
  priceFilter: PriceFilter;
  setPriceFilter: Function;
};

const FiltersForm = ({
  filters,
  setFilters,
  setOpenModal,
  priceFilter,
  setPriceFilter,
}: Props) => {
  const [openFilter, setOpenFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFiltersSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    setOpenModal("");
  };

  const handleClearFilters = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilters({ category: [], sleeve: [], color: [], size: [] });
    setPriceFilter({ min: 0, max: 0 });
  };

  return (
    <form className="sf-form center column" onSubmit={handleFiltersSubmit}>
      <div className="flex sf-form-top">
        <span className="flex sf-legend-container">
          <span className="center legend-icon">
            <FilterList />
          </span>
          <legend className="bolder">Filter</legend>
        </span>
        <button className="icon" onClick={() => setOpenModal("")}>
          <CloseOutlined />
        </button>
      </div>
      <div id="filters" className="flex column sf-values">
        {Object.keys(filterValues).map((filterName, index) => (
          <fieldset key={index}>
            <OpenFilterValuesFieldButton
              filterName={filterName}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
            />
            {openFilter === filterName &&
              (filterName !== "price" ? (
                <FilterValuesField
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
        <button className="submit-button" type="submit">
          View
        </button>
        <button className="hover" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
    </form>
  );
};

export default FiltersForm;
