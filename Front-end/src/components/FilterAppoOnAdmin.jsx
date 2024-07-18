const FilterAppoOnAdmin = ({ categorias, setCategorias }) => {
  return (
    <div className="filtrar-citas-en-admin">
      <label htmlFor="categorias">Filtrar:</label>
      <select
        name="categorias"
        id="categorias"
        value={categorias}
        onChange={(e) => setCategorias(e.target.value)}
      >
        <option value="todas">Todas</option>
        <option value="pendiente">Pendientes</option>
        <option value="realizada">Realizadas</option>
        <option value="cancelado">canceladas</option>
      </select>
    </div>
  );
};

export default FilterAppoOnAdmin;
