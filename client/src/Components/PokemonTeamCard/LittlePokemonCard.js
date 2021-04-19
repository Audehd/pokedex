import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { setBackgroundColor } from "../../UtilityFunctions";

const LittlePokemonCard = ({ pokemon }) => {
  //state for aditional Pokemon information about the pokemeon
  const [pokemonInfo, setPokemonInfo] = useState();

  //Fetch Pokemon by species - to get aditional information about the pokemon
  const fetchPokemonInfo = () => {
    fetch(`/pokemons/species/${pokemon.pokedexNumber}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemonInfo(res.data);
      });
  };

  useEffect(() => {
    fetchPokemonInfo();
  }, []);

  if (pokemonInfo) {
    return (
      <PokemonWrapper bgColor={setBackgroundColor(pokemonInfo.color.name)}>
        <ImageWrapper bgColor={setBackgroundColor(pokemonInfo.color.name)}>
          <Image
            src={pokemon.sprites.front_default}
            alt={`${pokemon.species.name}`}
          />
        </ImageWrapper>
        <InfoWrapper>
          <Name key={pokemon.pokedexNumber}>{pokemon.pokemonName}</Name>
          <Number>#{pokemon.pokedexNumber}</Number>
          <Nickname>
            Nickname: <Value>{pokemon.nickname}</Value>
          </Nickname>
          <Nature>
            nature: <Value>{pokemon.nature}</Value>
          </Nature>
          <HeldItem>
            Held Item: <Value>{pokemon.helditem}</Value>
          </HeldItem>
          {/* {pokemon.stats.map((stat) => {
          return (
            <>
              <StatName>{stat.stat.name}</StatName>
              <StatValue>{stat.base_stat}</StatValue>
            </>
          );
        })} */}
        </InfoWrapper>
      </PokemonWrapper>
    );
  } else {
    return <div>...Loading</div>;
  }
};

export default LittlePokemonCard;

const ImageWrapper = styled.div`
  //background: white;
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.secondaryColor};
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  width: 100px;
`;

const PokemonWrapper = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  //background-color: #ffabab;
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.backgroundColor};
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
`;

const InfoWrapper = styled.div``;

const Name = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: black;
  margin: 5px 5px 0 10px;
`;

const Number = styled.span`
  margin: 5px 0 0 0;
  font-size: 16px;
  font-weight: 500;
  color: #6c757d;
`;

const Nickname = styled.p`
  margin: 5px 0 0 10px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
`;

const HeldItem = styled.p`
  margin: 5px 0 0 10px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
`;

const Nature = styled.p`
  margin: 5px 0 0 10px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
`;

const Value = styled.span`
  color: #6c757d;
  margin-left: 5px;
`;

// const StatName = styled.p`
//   margin: 5px 0 0 10px;
//   font-size: 18px;
//   font-weight: 500;
//   text-align: left;
// `;

// const StatValue = styled.p`
//   margin: 5px 0 0 10px;
//   font-size: 18px;
//   font-weight: 500;
//   text-align: left;
// `;
