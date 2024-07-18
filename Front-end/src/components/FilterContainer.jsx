import { FilterSVG, SearchSVG } from "../assets/IconsSVG";

const FilterContainer = () => {
  return (
    <div className="filter-container">
      {/* <button className="fil">
        <FilterSVG classElement={"search-icon"} />
        Filtrar
      </button> */}
      <label className="search-ctn fil">
        <input type="text" placeholder="Buscar..." />
        <SearchSVG />
      </label>
    </div>
  );
};

export default FilterContainer;
