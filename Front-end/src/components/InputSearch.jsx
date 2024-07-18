import { SearchSVG } from "../assets/IconsSVG";

const InputSearch = ({ inputData, setInputData }) => {
  return (
    <label className="laber-search-user-from-admin-view fil">
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setInputData(e.target.value.toLowerCase())}
        value={inputData}
      />
      <SearchSVG />
    </label>
  );
};

export default InputSearch;
