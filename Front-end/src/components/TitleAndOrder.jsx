const TitleAndOrder = ({ title, span, order }) => {
  return (
    <>
      <h2>
        {title} <span>{span ? `- ${span}` : ""}</span>
      </h2>
      <hr />
      <p>{order}</p>
    </>
  );
};

export default TitleAndOrder;
