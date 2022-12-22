import { useState, useEffect } from "react";

export default function CityForm({ handleClick, isLoading }) {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("'s-gravenwezel");
  const [entity, setEntity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/cities?entity=${entity}`)
      .then((response) => {
        return response.json();
      })
      .then((citiesJson) => {
        console.log(citiesJson);
        citiesJson.sort((a, b) =>
          a.description > b.description
            ? 1
            : b.description > a.description
            ? -1
            : 0
        );
        setCities(citiesJson);
      });
  }, [entity]);

  return (
    <>
      <form className="flex flex-col w-1/2 justify-center items-center">
        <label
          className="font-light text-white self-start"
          htmlFor="provincie-select"
        >
          Province:
        </label>
        <select
          className="capitalize focus:ring-0 font-bold text-3xl w-1/2 bg-transparent border-b-2 border-x-0 border-t-0 border-b-white text-white bg-black mb-10"
          id="provincie-select"
          value={entity}
          onChange={(e) => {
            console.log(e);
            setEntity(e.target.value);
          }}
          disabled={isLoading}
        >
          <option value="1">Antwerpen</option>
          <option value="2">Oost-Vlaanderen</option>
          <option value="3">Vlaams-Brabant</option>
          <option value="4">Limburg</option>
          <option value="5">West-Vlaanderen</option>
        </select>
        <label
          className="font-light text-white self-start"
          htmlFor="city-select"
        >
          City:
        </label>
        <select
          className="capitalize focus:ring-0 font-bold text-3xl w-1/2 bg-transparent border-b-2 border-x-0 border-t-0 border-b-white text-white bg-black mb-10"
          id="city-select"
          onChange={(e) => {
            console.log(e);
            setCity(e.target.value);
          }}
          disabled={isLoading}
        >
          {cities.map((city) => {
            return (
              <option className="capitalize" value={city.description}>
                {city.description}
              </option>
            );
          })}
        </select>
      </form>
      <button
        className="mt-10 mb-20 rounded-lg bg-white px-8 py-4 font-bold text-3xl disabled:bg-slate-200 disabled:text-slate-700"
        onClick={() => {
          handleClick(entity, city);
        }}
        disabled={isLoading}
      >
        Tell me!
      </button>
    </>
  );
}
