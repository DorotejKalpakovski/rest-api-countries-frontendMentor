import Arrow from "../images/arrow-icon.svg";

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

const FocusedCard = ({ data, goToBorderCountry, goToHome }) => {
  const { borders } = data;
  const borderButtons = borders
    ? borders.map((cca3) => (
        <button
          className="button shadow-accent"
          key={cca3}
          onClick={() => {
            goToBorderCountry(cca3);
          }}
        >
          {cca3}
        </button>
      ))
    : undefined;
  return (
    <div className="focused-card-container">
      <button onClick={goToHome} className="back-button button shadow-accent">
        <img src={Arrow} alt="arrow left" />
        Back
      </button>
      <div className="focused-card">
        <img src={data.flags.png} alt="" className="focused-card-flag" />
        <div className="focused-card-info">
          <h3>{data.name.common}</h3>
          <div className="focused-card-info-stats">
            <div className="stats-container">
              <p>
                <span className="fw-600">Native Name: </span>
                <span style={{ opacity: ".8" }}>
                  {Object.values(data.name.nativeName).last().common}
                </span>
              </p>
              <p>
                <span className="fw-600">Population: </span>
                <span style={{ opacity: ".8" }}>{data.population}</span>
              </p>
              <p>
                <span className="fw-600">Region: </span>
                <span style={{ opacity: ".8" }}>{data.region}</span>
              </p>
              <p>
                <span className="fw-600">Sub Region: </span>
                <span style={{ opacity: ".8" }}>{data.subregion}</span>
              </p>
              <p>
                <span className="fw-600">Capital: </span>
                <span style={{ opacity: ".8" }}>{data.capital[0]}</span>
              </p>
            </div>
            <div className="stats-container">
              <p>
                <span className="fw-600">Top Level Domain: </span>
                <span style={{ opacity: ".8" }}>{data.tld}</span>
              </p>
              <p>
                <span className="fw-600">Currencies: </span>
                <span style={{ opacity: ".8" }}>
                  {Object.values(data.currencies)[0].name}
                </span>
              </p>
              <p>
                <span className="fw-600">Languages: </span>
                <span style={{ opacity: ".8" }}>
                  {Object.values(data.languages).reduce((res, lang) => {
                    return String(res) + ", " + String(lang);
                  })}
                </span>
              </p>
            </div>
          </div>
          <div className="stats-container">
            <p className="fw-600">Border Countries: </p>
            <div className="border-countries-buttons">{borderButtons}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusedCard;
