import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Country from "./Country";
import { useSelector, useDispatch } from "react-redux";
import Input from "./Input";

const CountryListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3m;
  background: var(--bg);
  padding: 4em 2em;
  justify-content: center;
`;

function CountryList() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const countryListByName = useSelector((state) => state.countryListByName);

  const countryList = useSelector((state) => {
    if ("" !== state.filterByRegion) {
      return state.coutryFilteredByRegion;
    }
    if (countryListByName.length > 0) {
      return countryListByName;
    }

    return state.countryList;
  });

  console.log("el estado total de mi app es", countryList);
  // const [countryList, setCountryList] = useState([])
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        return response.json();
      })
      .then((list) => {
        dispatch({
          type: "SET_COUNTRY_LIST",
          payload: list,
        });
        // setCountryList(data)
        console.log(list.length);
      })
      .catch(() => {
        console.log("hubo un error, que dolor que dolo que pena");
      });
  }, [dispatch]);
  const filterByName = (e) => {
    setInputValue(e.target.value);
    dispatch({
      type: "SET_COUNTRY_BY_NAME",
      payload: e.target.value,
    });
  };
  const clearInput = () => {
    dispatch({
      type: "SET_COUNTRY_BY_NAME",
      payload: "",
    });
    setInputValue("");
  };
  return (
    <CountryListStyled>
      <Input
        placeholder="Search for a country..."
        value={inputValue}
        onChange={filterByName}
      />
      {inputValue && <button onClick={clearInput}>X</button>}
      {countryListByName.length === 0 && inputValue && (
        <p>
          <strong>{inputValue}</strong> Not found in countries
        </p>
      )}
      {countryList.map(({ name, flag, population, capital, region }) => {
        return (
          <Country
            flag={flag}
            name={name}
            key={name}
            population={population}
            region={region}
            capital={capital}
          />
        );
      })}
    </CountryListStyled>
  );
}

export default CountryList;
