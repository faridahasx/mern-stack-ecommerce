import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputLabel, Input } from "@mui/material";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import { getAuthInstance } from "../../utils/axiosInstance";
import { ButtonProgress } from "../loading/Loading";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOnline = useNetworkStatus();
  const [data, setData] = useState(userAddressInitialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const authInstance = await getAuthInstance();
        if (!authInstance) return navigate("/login");
        const res = await authInstance.get("/api/user/address");
        setData((state) => ({ ...state, ...res.data }));
      } catch (err) {}
    };
    getAddress();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOnline) return;
    setLoading(true);
    try {
      const authInstance = await getAuthInstance();
      if (!authInstance) return navigate("/login");
      const res = await authInstance.patch("/api/user/address", data);
      dispatch({ type: "SUCCESS", payload: res.data });
    } catch (err: any) {
      err.response.data &&
        dispatch({ type: "ERROR", payload: err.response.data });
    }
    setLoading(false);
  };

  const handleInputChange = (e: ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    let { name, value } = target;
    setData({ ...data, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex column" name="address book">
      <h1>Address Book</h1>
      {userAddressInputs.map((i) => (
        <>
          <InputLabel htmlFor={i.name}>{i.label}</InputLabel>
          <Input
            id={i.name}
            className="profile-input"
            type="text"
            onChange={handleInputChange}
            name={i.name}
            value={data[i.name as keyof UserAddress]}
          />
        </>
      ))}
      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? <ButtonProgress /> : "Save"}
      </button>
    </form>
  );
};

export default AddressBook;
