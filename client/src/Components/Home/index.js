import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import PokemonCard from "../PokemonCard";

import { getRandomPokemons } from "../../UtilityFunctions";

const Home = ({ pokemonSearchResult, setPokemonSearchResult }) => {
  //State for the current logged in user
  const CurrentUserstate = useSelector((state) => state.user);

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

  useEffect(() => {
    getRandomPokemons(getPokemonsByName);
  }, []);

  console.log("USER STATE", CurrentUserstate);
  if (pokemonSearchResult) {
    return (
      <Wrapper>
        {pokemonSearchResult.map((pokemon) => {
          return (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.species.name}
              pokedexNumber={pokemon.id}
              imgSrc={pokemon.sprites.other["official-artwork"].front_default}
              types={pokemon.types}
            />
          );
        })}
      </Wrapper>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Home;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 24px;
  width: 70%;
`;
