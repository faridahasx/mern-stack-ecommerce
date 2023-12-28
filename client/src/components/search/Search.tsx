import { ChangeEvent, useState, FormEvent, MouseEvent } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Clear, SearchOutlined } from "@mui/icons-material";
import { Product } from "../../assets/types";
import { axiosBaseInstance } from "../../utils/axiosInstance";
import "./styles.css";

type Props = {
  close: Function;
};

const Search = ({ close }: Props) => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Array<Product>>([]);
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    close();
    navigate({
      pathname: "/products",
      search: createSearchParams({ page: "1", search: inputData }).toString(),
    });
  };

  const handleInputChange = async (e: ChangeEvent) => {
    e.preventDefault();
    let value = (e.target as HTMLInputElement).value;
    setInputData(value);
    if (value) {
      setLoading(true);
      try {
        const res = await axiosBaseInstance.get(
          `/api/products?title[regex]=${value}`
        );
        setSearchResults(res.data.products);
      } catch (err) {}
      setLoading(false);
    }
  };

  const closeSearchByClickingBackground = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    target.className === "background" && close();
  };

  return (
    <div className="background" onClick={closeSearchByClickingBackground}>
      <div id="search-wrapper">
        <form className="center" onSubmit={handleFormSubmit}>
          <div id="search-input-container" className="center">
            <input
              id="search-input"
              className="flex"
              type="search"
              onChange={handleInputChange}
              placeholder="Search"
              value={inputData}
              autoFocus
            />
            <div id="end-adornment" className="flex">
              {inputData && (
                <IconButton type="button" onClick={() => setInputData("")}>
                  <Clear />
                </IconButton>
              )}
              <button className="icon" type="submit" title="Search">
                <SearchOutlined />
              </button>
            </div>
          </div>
        </form>
        <ul id="search-results-list" aria-live="polite" aria-busy={loading}>
          {inputData.length > 0 &&
            (searchResults.length > 0
              ? searchResults.map((result, index) => {
                  return (
                    <li key={index} className="center">
                      <Link
                        className="search-result-link flex"
                        to={`/product/${result._id}`}
                      >
                        <span className="center icon">
                          <SearchOutlined />
                        </span>
                        <span className="search-result-title">
                          {result.title}{" "}
                        </span>
                        <span className="text-overflow search-result-category">
                          {result.category}
                        </span>
                      </Link>
                    </li>
                  );
                })
              : !loading && (
                  <li id="no-result">
                    <span className="center">
                      No Result for {`"${inputData}"`}
                    </span>
                  </li>
                ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
