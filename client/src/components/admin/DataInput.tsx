import { ChangeEvent } from "react";
import { InputLabel, Input } from "@mui/material";
import { ProductInputData, ProductInputDataKey } from "../../assets/types";

type Props = {
  inputData: ProductInputData;
  setInputData: Function;
};

const DataInput = ({ inputData, setInputData }: Props) => {
  const handleDataInputChange = (e: ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <>
      {Object.keys(inputData).map(
        (item, indx) =>
          item !== "img" && (
            <div key={indx}>
              <InputLabel htmlFor={item}> {item} </InputLabel>
              <Input
                id={item}
                className="product-input"
                type={
                  item === "price" || item === "inStock" ? "number" : "text"
                }
                onChange={handleDataInputChange}
                name={item}
                value={inputData[item as ProductInputDataKey]}
              />
            </div>
          )
      )}
    </>
  );
};

export default DataInput;
