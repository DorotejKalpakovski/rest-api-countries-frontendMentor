import { React, useEffect, useState } from "react";
import Card from "./components/Card";
import FocusedCard from "./components/FocusedCard";

function App() {
  const [countries, setCountries] = useState();
  const [loading, setLoading] = useState(true);
  const [focusedCountry, setFocusedCountry] = useState(undefined);
  const [filter, setFilter] = useState("noFilter");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countriesMap = data.reduce((obj, country) => {
          return {
            ...obj,
            [country.cca3]: country,
          };
        }, {});
        setCountries(countriesMap);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const focusCountry = (cca3) => {
    setFocusedCountry(countries[cca3]);
  };

  const getCountries = () => {
    const countriesFiltered =
      filter === "noFilter"
        ? Object.values(countries)
        : Object.values(countries).filter(
            (country) => country.region === filter
          );
    const countriesSearch = countriesFiltered.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    return countriesSearch.sort((a, b) => {
      return a.name.common.localeCompare(b.name.common);
    }).map((country) => {
      const flag = country.flags.png;
      const name = country.name.common;
      const { population, region } = country;
      const capital = country.capital;
      const cca3 = country.cca3;
      const continent = country.continents;

      return (
        <Card
          key={cca3}
          flag={flag}
          name={name}
          pop={population}
          region={region}
          continent={continent}
          capital={capital}
          onClick={() => {
            focusCountry(cca3);
          }}
        />
      );
    });
  };

  const countryElements = loading ? "Loading..." : getCountries();

  return (
    <div className="App">
      <header className="shadow-accent">
        <h3 style={{ fontWeight: "800" }}>Where in the World?</h3>
      </header>
      {focusedCountry ? (
        <FocusedCard
          data={focusedCountry}
          goToHome={() => {
            setFocusedCountry(undefined);
          }}
          goToBorderCountry={(cca3) => {
            focusCountry(cca3);
          }}
        />
      ) : (
        <div>
          <div className="container">
            <div className="countries-filters">
              <input
                className="countries-filters-search shadow-accent"
                type={"text"}
                value={search}
                onChange={(event) => {
                  const text = event.target.value;
                  setSearch(text);
                }}
                placeholder={"Search for a country..."}
              />
              <select
                className="countries-filters-filter shadow-accent"
                value={filter}
                onChange={(event) => {
                  setFilter(event.target.value);
                }}
                placeholder={"asd"}
              >
                <option value="noFilter"></option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
            <div className="countries-grid">{countryElements}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
