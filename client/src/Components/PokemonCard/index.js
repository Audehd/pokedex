import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PokemonType from "./PokemonType";

//This functions takes the pokemon main color as parameter and determines the background color and secondary color for the pokemon card
import { setBackgroundColor } from "../../UtilityFunctions";

const PokemonCard = ({ name, pokedexNumber, imgSrc, types }) => {
  //state for aditional Pokemon information about the pokemeon
  const [pokemonInfo, setPokemonInfo] = useState();

  //Fetch Pokemon by species - to get aditional information about the pokemon
  const getPokemonSpeciesByName = () => {
    fetch(`/pokemons/species/${name}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemonInfo(res.data);
      });
  };

  useEffect(() => {
    getPokemonSpeciesByName();
  }, []);

  if (pokemonInfo) {
    return (
      <Wrapper
        to={`/pokemon/${pokedexNumber}`}
        bgColor={setBackgroundColor(pokemonInfo.color.name)}
      >
        <ImageWrapper bgColor={setBackgroundColor(pokemonInfo.color.name)}>
          <Image src={imgSrc} alt={`${name}`} />
        </ImageWrapper>
        <Title>{name}</Title>
        <Number># {pokedexNumber}</Number>
        {types.map((type) => {
          return <PokemonType type={type.type.name} />;
        })}
      </Wrapper>
    );
  } else {
    return <div>...loading</div>;
  }
};

export default PokemonCard;

const Wrapper = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 16px;
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.backgroundColor};
  box-shadow: 3px 2.8px 2.2px rgba(0, 0, 0, 0.07),
    3px 6.7px 5.3px rgba(0, 0, 0, 0.05), 3px 12.5px 10px rgba(0, 0, 0, 0.042),
    3px 22.3px 17.9px rgba(0, 0, 0, 0.035),
    3px 41.8px 33.4px rgba(0, 0, 0, 0.028), 3px 100px 80px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  text-align: center;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const ImageWrapper = styled.div`
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.secondaryColor};
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 12px;
  margin-top: 8px;
  font-size: 22px;
  font-weight: 600;
`;

const Number = styled.h3`
  margin: 0;
  margin-bottom: 10px;
  margin-top: 4px;
  font-size: 16px;
  font-weight: 600;
`;
