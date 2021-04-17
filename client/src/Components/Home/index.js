import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import PokemonCard from "../PokemonCard";

import { getRandomPokemons } from "../../UtilityFunctions";

const Home = ({ pokemonSearchResult, setPokemonSearchResult }) => {
  //State for the current logged in user
  const CurrentUserstate = useSelector((state) => state);

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
  // //Pokemon name from user search  //DON'T NEED ANYMORE?
  // let pokemonName = "Sylveon";
  // //Fetch one Pokemon by name, this needs to be done that if there is one result,
  // it can be set into an array
  // //that way we can still map over the result and display the pokemon card.
  // const getPokemonByName = () => {
  //   fetch(`/pokemons/pokemon/${pokemonName}`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setPokemonSearchResult([res.data]);
  //     })
  //     .catch((error) => {
  //       console.log("Error", error);
  //     });
  // };

  // //DON'T NEED ANYMORE?
  //Fetch a Pokemon list, this returns an array of pokemon names
  // const getPokemonList = () => {
  //   fetch("/pokemons/list")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       let pokemonList = res.data.results.map((pokemon) => pokemon.name);
  //       console.log("pokemon list", pokemonList);
  //       getPokemonsByName(pokemonList);
  //     })
  //     .catch((error) => {
  //       console.log("Error", error);
  //     });
  // };

  useEffect(() => {
    getRandomPokemons(getPokemonsByName);
  }, []);

  //console.log("STATE", CurrentUserstate);
  if (pokemonSearchResult) {
    return (
      <Wrapper>
        <div>POKEDEX HOME PAGE</div>
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
