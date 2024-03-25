import "./PriceFilter.css";
import { ChangeEvent } from "react";
import { Input, InputAdornment } from "@mui/material";
import { PriceFilter as FilterType } from "../../assets/types";

type Props = {
  priceFilter: FilterType;
  setPriceFilter: Function;
};

const PriceFilter = ({ priceFilter, setPriceFilter }: Props) => {
  const handlePriceChange = (e: ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    setPriceFilter({ ...priceFilter, [name]: value });
  };

  const { min, max } = priceFilter;

  return (
    <div id="price-filter" className="filter-values flex">
      <Input
        className="price-input"
        type="number"
        onChange={handlePriceChange}
        placeholder="min"
        value={min}
        name="min"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
      <span>-</span>
      <Input
        className="price-input"
        type="number"
        onChange={handlePriceChange}
        placeholder="max"
        value={max}
        name="max"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
    </div>
  );
};

export default PriceFilter;
