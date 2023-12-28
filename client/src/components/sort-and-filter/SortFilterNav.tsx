import { Suspense, lazy, useEffect, useState, MouseEvent } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { FilterList, Sort } from "@mui/icons-material";
import { Filters } from "../../assets/types";
import "./styles.css";

const SortForm = lazy(() => import("./SortForm"));
const FiltersForm = lazy(() => import("./Filters/FiltersForm"));

const SortFilterNav = () => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState<Filters>({
    category: [],
    sleeve: [],
    color: [],
    size: [],
  });
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 0 });

  useEffect(() => {
    // Handle overflow
    openModal
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [openModal]);

  useEffect(() => {
    const category = searchParams.get("category")?.split(",") ?? [];
    const sleeve = searchParams.get("sleeve")?.split(",") ?? [];
    const color = searchParams.get("color")?.split(",") ?? [];
    const size = searchParams.get("size")?.split(",") ?? [];
    const sort = searchParams.get("sort");
    const minPrice = searchParams.get("min");
    const maxPrice = searchParams.get("max");
    setFilters({
      category: category,
      sleeve: sleeve,
      color: color,
      size: size,
    });
    setSort(sort || "");
    setPriceFilter({ min: Number(minPrice), max: Number(maxPrice) });
  }, [location.search, searchParams]);

  const closeModalByClickingBackground = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as Element;
    target.className === "modal-container" && setOpenModal("");
  };

  return (
    <nav id="sf-nav" className="center">
      <ul id="sf-nav-ul" className="center">
        <li className="center">
          <button className="hover" onClick={() => setOpenModal("sort")}>
            <span>
              <Sort />
            </span>
            <span>Sort</span>
          </button>
        </li>
        <li className="center">
          <button className="hover" onClick={() => setOpenModal("filters")}>
            <span>
              <FilterList />
            </span>
            <span>Filter</span>
          </button>
        </li>
      </ul>
      <Suspense>
        {openModal && (
          <section
            className="modal-container"
            onClick={closeModalByClickingBackground}
          >
            {openModal === "filters" ? (
              <FiltersForm
                filters={filters}
                setFilters={setFilters}
                setOpenModal={setOpenModal}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
              />
            ) : (
              openModal === "sort" && (
                <SortForm
                  sort={sort}
                  setSort={setSort}
                  setOpenModal={setOpenModal}
                />
              )
            )}
          </section>
        )}
      </Suspense>
    </nav>
  );
};

export default SortFilterNav;
