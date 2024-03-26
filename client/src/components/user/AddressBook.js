import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { InputLabel, Input } from "@mui/material";
import { axiosInstance } from "../../utils/axiosInstance";
import { ButtonProgress } from "../Loading/Loading";
import "./AddressBook.css";
import SubmitButton from "../Buttons/SubmitButton";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
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
            }
            catch (err) { }
        });
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        executeServerRequest(async () => {
            await axiosInstance.patch("/api/user/address", data);
        }, [], true, "Saved changes");
    };
    const handleInputChange = (e) => {
        let target = e.target;
        let { name, value } = target;
        setData({ ...data, [name]: value });
    };
    return (_jsxs("form", { id: "address-form", onSubmit: handleSubmit, className: "flex column", name: "Address Book", children: [_jsx("h1", { children: "Address Book" }), userAddressInputs.map((i) => (_jsxs(_Fragment, { children: [_jsx(InputLabel, { htmlFor: i.name, children: i.label }), _jsx(Input, { id: i.name, className: "address-input", type: "text", onChange: handleInputChange, name: i.name, value: data[i.name] })] }))), _jsx(SubmitButton, { type: "submit", disabled: loading, children: loading ? _jsx(ButtonProgress, {}) : "Save" })] }));
};
export default AddressBook;
