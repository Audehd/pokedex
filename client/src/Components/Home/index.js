import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import PokemonCard from "../PokemonCard";
import Button from "../Button";

import { getRandomPokemons } from "../../UtilityFunctions";

const Home = ({
  pokemonSearchResult,
  setPokemonSearchResult,
  loading,
  setLoading,
}) => {
  //State for the current logged in user
  const CurrentUserstate = useSelector((state) => state.user);

  //Fetch several Pokemons by name, the endpoint accepts an array of pokemon names or Ids
  const getPokemonsByName = (pokemonList, callback) => {
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
        callback(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getRandomPokemons(getPokemonsByName, setPokemonSearchResult);
  }, []);

  //Load more pokemon at bottom of page
  const loadMorePokemon = (ev) => {
    ev.preventDefault();
    setLoading(true);
    getRandomPokemons(getPokemonsByName, setPokemonSearchResult);
  };

  //-------console logs
  //console.log("USER STATE", CurrentUserstate);

  if (pokemonSearchResult && loading === false) {
    return (
      <>
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
        <ButtonWrapper>
          <Button
            text="Load more Pokemon"
            handleClick={loadMorePokemon}
          ></Button>
        </ButtonWrapper>
      </>
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
  //width: 70%;
`;

const ButtonWrapper = styled.div`
  width: 200px;
  margin: 100px auto 100px auto;
`;
