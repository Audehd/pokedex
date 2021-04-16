import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { setBackgroundColor } from "../../UtilityFunctions";

const EvolutionCard = ({ evolutionChainLink, color }) => {
  //States for the names of pokemons at each stage of evolution
  const [firstStage, setFirstStage] = useState(null);
  const [secondStage, setSecondStage] = useState(null);
  const [thirdStage, setThirdStage] = useState(null);

  const [pokemonSearchResult, setPokemonSearchResult] = useState();

  //function to get evolution chain information
  const fetchEvolutionChainById = () => {
    const id = evolutionChainLink.slice(42, -1);
    fetch(`/evolutionchain/${id}`)
      .then((res) => res.json())
      .then((res) => {
        //this contains first stage evolution, returns a string
        const first = res.data.chain.species.name;
        //console.log("FIRST STAGE", first);
        setFirstStage(first);
        //this contains second stage evolution, returns an array of strings (pokemon names)
        const second = res.data.chain.evolves_to.map(
          (each) => each.species.name
        );
        //console.log("SECOND STAGE", second);
        setSecondStage(second);
        //this contains third stage evolution, returns a string
        const third = res.data.chain.evolves_to[0]?.evolves_to[0]?.species.name;
        //console.log("THIRD STAGE", third);
        setThirdStage(third);
      });
  };

  //Fetch several Pokemons by name, the endpoint accepts an array of pokemon names or Ids
  const getPokemonsByName = (secondStage) => {
    fetch("/pokemons/pokemon/name", {
      method: "POST",
      body: JSON.stringify(secondStage),
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

  //fetch one pokemon by name
  const getPokemonByName = (pokemonName) => {
    fetch(`/pokemons/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemonSearchResult([res.data]);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    fetchEvolutionChainById();
  }, [evolutionChainLink]);

  useEffect(() => {
    //getPokemonByName(firstStage);
    getPokemonsByName(secondStage);
  }, [firstStage, secondStage]);

  if (pokemonSearchResult) {
    return (
      <Wrapper bgColor={setBackgroundColor(color)}>
        pokemon evolution card
        <p>{firstStage}</p>
        {pokemonSearchResult.map((pokemon) => {
          return (
            <div key={pokemon.species.name}>
              <Image
                src={pokemon.sprites.other["official-artwork"].front_default}
              />
              <p>{pokemon.species.name}</p>
            </div>
          );
        })}
      </Wrapper>
    );
  } else {
    return <div>... Loading</div>;
  }
};

export default EvolutionCard;

const Wrapper = styled.div`
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.secondaryColor};
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  margin-top: 50px;

  @media (max-width: 1000px) {
    display: flex;
    justify-content: center;
  }
`;

const Image = styled.img`
  width: 225px;
  height: auto;
`;
