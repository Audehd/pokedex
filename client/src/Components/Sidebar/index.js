import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import SearchInput from "./searchInput";
import Button from "../Button";

import { getRandomPokemons, getPokemonsByName } from "../../UtilityFunctions";

const Sidebar = ({ pokemonSearchResult, setPokemonSearchResult }) => {
  //State for search keyword
  const [keyword, setKeyword] = useState();
  //State for pokedex entries for specific region
  //const [regionList, setRegionList] = useState();

  const regions = {
    Kanto: { start: 0, end: 151 },
    Johto: { start: 152, end: 251 },
    Hoenn: { start: 252, end: 386 },
    Sinnoh: { start: 387, end: 493 },
    Unova: { start: 494, end: 649 },
    Kalos: { start: 650, end: 721 },
    Alola: { start: 722, end: 809 },
    Galar: { start: 810, end: 898 },
  };

  const history = useHistory();

  const handleChange = (value) => {
    setKeyword(value);
  };

  const getPokemonsByName = (pokemonList) => {
    fetch("/pokemons/pokemon/name", {
      method: "POST",
      body: JSON.stringify(pokemonList),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPokemonSearchResult(res.data.results);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // const getPokedexList = () => {
  //   fetch("/pokedex")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setRegionList(res.data.results);
  //     });
  // };

  useEffect(() => {
    //getPokedexList();
  }, []);

  //When the user presses the submit button, redirect user to that pokemon page
  //(works with a pokedex number or the pokemon name)
  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log("search keyword", keyword);
    history.push(`/pokemon/${keyword}`);
  };

  //Function to generate an array of numbers (national dex numbers)
  //then pass that array in the get pokemons by name function
  const handleRandom = (ev) => {
    ev.preventDefault();
    getRandomPokemons(getPokemonsByName);
  };

  const handleRegionSelect = (ev) => {
    const selected = ev.target.value;
    const regionalPokedex = regions[selected];
    console.log("RANGE", regionalPokedex);
    //getPokemonsByName(regionalPokedex);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <SearchLabel>Name or Pokédex number</SearchLabel>
        <SearchInput
          name="search"
          placeholder="Enter Pokemon name or number"
          type="text"
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          value={keyword}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button handleClick={handleSubmit} text="Search" />
      </ButtonWrapper>
      <ButtonWrapper>
        <Button handleClick={handleRandom} text="Random Pokémons" />
      </ButtonWrapper>

      <Form>
        <label>
          <Filter>Search by region</Filter>
          <Select onChange={(ev) => handleRegionSelect(ev)}>
            <option key={0}>Select a region</option>
            {Object.keys(regions).map((region) => {
              return (
                <option key={region} value={region}>
                  {region}
                </option>
              );
            })}
          </Select>
        </label>
      </Form>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  width: 400px;
  height: 100%;
  min-height: 100vh;
  background-color: #ff6961;
  border-right: 12px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin: 20px 10px;
`;

const SearchLabel = styled.p`
  font-size: 30px;
  margin: 10px 10px;
`;

const ButtonWrapper = styled.div`
  margin: 15px 0;
`;

const Form = styled.form``;

const Select = styled.select`
  margin: 20px 10px;
  border-radius: 12px;
  border: 3px solid black;
  box-sizing: border-box;
  color: #464a5c;
  font-size: 17px;
  font-weight: 300;
  height: 54px;
  padding: 8px 12px 10px 12px;
  width: 80%;

  option {
    color: black;
    background: white;
  }
`;

const Filter = styled.p`
  font-size: 30px;
  margin: 100px 10px 0 10px;
`;
