import React, { useEffect } from "react";
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
  getRandom,
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
    //Function to generate an array of numbers (national dex numbers)
    //then pass that array in the get pokemons by name function
    getRandomPokemons(getPokemonsByName, setPokemonSearchResult);
  }, [getRandom]);

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
  margin: 50px;
`;

const ButtonWrapper = styled.div`
  width: 200px;
  margin: 100px auto 100px auto;
`;
