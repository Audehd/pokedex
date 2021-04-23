import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import SearchInput from "./searchInput";
import Button from "../Button";
import PokemonType from "../PokemonCard/PokemonType";

import { regions } from "../../Data";

const Sidebar = ({
  setLoading,
  getRandom,
  setGetRandom,
  pokemonSearchResult,
  setPokemonSearchResult,
}) => {
  //State for search keyword
  const [keyword, setKeyword] = useState();
  //State for pokemon types
  const [types, setTypes] = useState();

  const history = useHistory();

  //Fetch several Pokemons by name, the endpoint accepts an array of pokemon names or Ids
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
        setPokemonSearchResult(res.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  //function to get all pokemon types
  const getAllTypes = () => {
    fetch("/types")
      .then((res) => res.json())
      .then((res) => {
        setTypes(res.data.results);
      });
  };

  //Function to set the search keyword when the user types in the search field
  const handleChange = (value) => {
    setKeyword(value.toLowerCase());
  };

  //When the user presses the submit button, redirect user to that pokemon page
  //(works with a pokedex number or the pokemon name)
  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log("search keyword", keyword);
    history.push(`/pokemon/${keyword}`);
  };

  //function to pass information to the Home component
  //it loads random Pokemons everytime the button is clicked
  const handleRandom = (ev) => {
    ev.preventDefault();
    history.push("/");
    setLoading(true);
    setGetRandom(!getRandom);
  };

  //when user selects a region from the dropdown menu, return a list of pokemon from that region
  const handleRegionSelect = (ev) => {
    const selected = ev.target.value;
    const regionalPokedex = regions[selected];
    const range = (start, end) => {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    };
    const pokedex = range(regionalPokedex.start, regionalPokedex.end);
    const pokemonList = pokedex.map(String);
    //getting test list for now with only 3o pokemons
    //becuause the POkemonAPI will not return a full 150+ list of pokemons
    const testList = pokemonList.slice(0, 40);
    console.log(testList);
    getPokemonsByName(testList);
  };

  const filterPokemonByType = (ev, typefilter) => {
    ev.preventDefault();
    const result = pokemonSearchResult.filter((pokemon) => {
      //console.log(pokemon);
      let types = pokemon.types.map((type) => type.type.name);
      //console.log(types);
      return types.includes(typefilter);
    });
    console.log(result);
    setPokemonSearchResult(result);
  };

  useEffect(() => {
    getAllTypes();
  }, []);

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
      <Filter>Search by Type</Filter>
      {types ? (
        <TypesWrapper>
          {types.map((type) => {
            return (
              <PokemonType
                handleClick={filterPokemonByType}
                size="sidebar"
                type={type.name}
              />
            );
          })}
        </TypesWrapper>
      ) : (
        <>
          <div>Loading...</div>
        </>
      )}
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
  margin: 15px 22px;
  width: 80%;
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
  margin: 40px 10px 0 10px;
`;

const TypesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 15px;
`;
