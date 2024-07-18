import { useNavigate } from "react-router-dom";

const FunctionalityInDevelopment = () => {
  let navigate = useNavigate();

  const handleButton = () => navigate(-1);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <h1>Funcionalidad en desarrollo</h1>

      <button className="btn" onClick={handleButton} style={{ margin: "auto" }}>
        Regresar
      </button>
    </section>
  );
};

export default FunctionalityInDevelopment;
