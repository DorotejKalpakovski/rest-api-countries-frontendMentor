const Card = ({ flag, name, pop, region, capital, onClick }) => {
  return (
    <div className="card shadow-accent" onClick={onClick}>
      <img src={flag} alt="flag" />
      <div className="card-info">
        <h3>{name}</h3>
        <p>
          Population: <span className="card-info-stats">{pop}</span>
        </p>
        <p>
          Region: <span className="card-info-stats">{region}</span>
        </p>
        <p>
          Capital: <span className="card-info-stats">{capital}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
