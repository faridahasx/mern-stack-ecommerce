import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { InputLabel, Input } from "@mui/material";
import { axiosInstance } from "../../utils/axiosInstance";
import { ButtonProgress } from "../Loading/Loading";
import "./AddressBook.css";
import SubmitButton from "../Buttons/SubmitButton";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";

interface UserAddress {
  firstname: string;
  lastname: string;
  mobile: string;
  country: string;
  streetAddress: string;
  apt: string;
  city: string;
  postcode: string;
}

let userAddressInitialState = {
  firstname: "",
  lastname: "",
  mobile: "",
  country: "",
  streetAddress: "",
  apt: "",
  city: "",
  postcode: "",
};

let userAddressInputs = [
  { name: "firstname", label: "First Name:" },
  { name: "lastname", label: "Last Name:" },
  { name: "mobile", label: "Mobile:" },
  { name: "country", label: "Country:" },
  { name: "streetAddress", label: "Street Address:" },
  { name: "apt", label: "Apt:" },
  { name: "city", label: "City:" },
  { name: "postcode", label: " Postcode:" },
];

const AddressBook = () => {
  const [data, setData] = useState(userAddressInitialState);
  const { executeServerRequest, loading } = useMakeNetworkRequest();

  useEffect(() => {
    executeServerRequest(async () => {
      try {
        const res = await axiosInstance.get("/api/user/address");
        setData((state) => ({ ...state, ...res.data }));
      } catch (err) {}
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeServerRequest(
      async () => {
        await axiosInstance.patch("/api/user/address", data);
      },
      [],
      true,
      "Saved changes"
    );
  };

  const handleInputChange = (e: ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    let { name, value } = target;
    setData({ ...data, [name]: value });
  };

  return (
    <form
      id="address-form"
      onSubmit={handleSubmit}
      className="flex column"
      name="Address Book"
    >
      <h1>Address Book</h1>
      {userAddressInputs.map((i) => (
        <>
          <InputLabel htmlFor={i.name}>{i.label}</InputLabel>
          <Input
            id={i.name}
            className="address-input"
            type="text"
            onChange={handleInputChange}
            name={i.name}
            value={data[i.name as keyof UserAddress]}
          />
        </>
      ))}
      <SubmitButton type="submit" disabled={loading}>
        {loading ? <ButtonProgress /> : "Save"}
      </SubmitButton>
    </form>
  );
};

export default AddressBook;
