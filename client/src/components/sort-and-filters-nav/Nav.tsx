import "./Nav.css";
import { Suspense, lazy, useState } from "react";
import { FilterList, Sort } from "@mui/icons-material";
import ModalLoading from "../modal/ModalLoading";

const SortForm = lazy(() => import("../sort/SortForm"));
const Filters = lazy(() => import("../filters/Filters"));

const Nav = () => {
  const [openModal, setOpenModal] = useState("");
  const handleOpenSort = () => setOpenModal("sort");
  const handleOpenFilters = () => setOpenModal("filters");
  const handleCloseModal = () => setOpenModal("");

  return (
    <nav id="sf-nav" className="center">
      <ul id="sf-nav-ul" className="center">
        <li className="center">
          <button className="hover" onClick={handleOpenSort}>
            <span>
              <Sort />
            </span>
            <span>Sort</span>
          </button>
        </li>
        <li className="center">
          <button className="hover" onClick={handleOpenFilters}>
            <span>
              <FilterList />
            </span>
            <span>Filter</span>
          </button>
        </li>
      </ul>

      <Suspense fallback={<ModalLoading handleClose={handleCloseModal} />}>
        {openModal === "filters" ? (
          <Filters
            closeModal={handleCloseModal}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          openModal === "sort" && (
            <SortForm
              closeModal={handleCloseModal}
              handleCloseModal={handleCloseModal}
            />
          )
        )}
      </Suspense>
    </nav>
  );
};

export default Nav;
