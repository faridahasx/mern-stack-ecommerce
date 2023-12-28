import OutlinedInput from "@mui/material/OutlinedInput";
import { InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { SelectInputData, SelectInputDataKey } from "../../assets/types";
import { productValues } from "../../assets/constants";

type Props = {
  setSelectInputData: Function;
  selectInputData: SelectInputData;
};

const SelectInput = ({ setSelectInputData, selectInputData }: Props) => {
  
  const handleSelectInputChange = (
    e: SelectChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    if (!name) return;
    name === "size"
      ? setSelectInputData({
          ...selectInputData,
          size: typeof value === "string" ? value.split(",") : value,
        })
      : setSelectInputData({ ...selectInputData, [name]: value });
  };

  return (
    <>
      {Object.keys(productValues).map((item, index) => (
        <span key={index}>
          <InputLabel id={item}>{item}</InputLabel>
          <Select
            id={item}
            className="product-input"
            labelId={item}
            input={<OutlinedInput label={item} />}
            onChange={handleSelectInputChange}
            multiple={item === "size"}
            name={item}
            value={selectInputData[item as SelectInputDataKey]}
          >
            {productValues[item].map((s: string) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </span>
      ))}
    </>
  );
};

export default SelectInput;
