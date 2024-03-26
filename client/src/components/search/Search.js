import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Search.css";
import { useState } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Clear, SearchOutlined } from "@mui/icons-material";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { axiosBaseInstance } from "../../utils/axiosInstance";
const Search = ({ close }) => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [inputData, setInputData] = useState("");
    const { executeServerRequest, loading } = useMakeNetworkRequest();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        close();
        navigate({
            pathname: "/products",
            search: createSearchParams({ page: "1", search: inputData }).toString(),
        });
    };
    const handleInputChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setInputData(value);
        if (value) {
            executeServerRequest(async () => {
                const res = await axiosBaseInstance.get(`/api/products?title[regex]=${value}`);
                setSearchResults(res.data.products);
            });
        }
    };
    const closeSearchByClickingBackground = (e) => {
        const target = e.target;
        target.className === "background" && close();
    };
    return (_jsx("div", { className: "background", onClick: closeSearchByClickingBackground, children: _jsxs("div", { id: "search-wrapper", children: [_jsx("form", { className: "center", onSubmit: handleFormSubmit, children: _jsxs("div", { id: "search-input-container", className: "center", children: [_jsx("input", { id: "search-input", className: "flex", type: "search", onChange: handleInputChange, placeholder: "Search", value: inputData, autoFocus: true }), _jsxs("div", { id: "end-adornment", className: "flex", children: [inputData && (_jsx(IconButton, { type: "button", onClick: () => setInputData(""), children: _jsx(Clear, {}) })), _jsx("button", { className: "icon", type: "submit", title: "Search", children: _jsx(SearchOutlined, {}) })] })] }) }), _jsx("ul", { id: "search-results-list", "aria-live": "polite", "aria-busy": loading, children: inputData.length > 0 &&
                        (searchResults.length > 0
                            ? searchResults.map((result, index) => {
                                return (_jsx("li", { className: "center", children: _jsxs(Link, { className: "search-result-link flex", to: `/product/${result._id}`, children: [_jsx("span", { className: "center icon", children: _jsx(SearchOutlined, {}) }), _jsxs("span", { className: "search-result-title", children: [result.title, " "] }), _jsx("span", { className: "text-overflow search-result-category", children: result.category })] }) }, index));
                            })
                            : !loading && (_jsx("li", { id: "no-result", children: _jsxs("span", { className: "center", children: ["No Result for ", `"${inputData}"`] }) }))) })] }) }));
};
export default Search;
