import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import PokemonType from "../PokemonCard/PokemonType";
import EvolutionCard from "./EvolutionCard";
import Button from "../Button";

import { setBackgroundColor } from "../../UtilityFunctions";

const PokemonInfoPage = () => {
  //State for the pokemon
  const [pokemon, setPokemon] = useState();
  //state for aditional Pokemon information about the pokemeon
  const [pokemonInfo, setPokemonInfo] = useState();
  //state for pokemon weaknesses
  const [pokemonWeakness, setPokemonWeakness] = useState();
  //State for the current logged in user
  const CurrentUserstate = useSelector((state) => state);
  //state for the favorites button
  const [buttonText, setButtonText] = useState("Add to favorites ❤");

  //Pokemon pokedexNumber from params
  let { pokedexNumber } = useParams();

  const history = useHistory();

  //function to get information about the pokemon, two different endpoints
  const fetchPokemonInfo = () => {
    //Fetch Pokemon by pokedex number
    fetch(`/pokemon/pokedexnumber/${pokedexNumber}`)
      .then((res) => res.json())

      .then((res) => {
        setPokemon(res.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    //Fetch Pokemon by species - to get aditional information about the pokemon
    fetch(`/pokemons/species/${pokedexNumber}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemonInfo(res.data);
      });
  };

  //function to get more information about the type(s) of the pokemon
  const getPokemonTypesInfo = () => {
    if (pokemon) {
      const types = pokemon.types.map((type) => type.type.name);
      fetch("/types/name", {
        method: "POST",
        body: JSON.stringify(types),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const weaknesses = res.data.map(
            (type) => type.damage_relations.double_damage_from
          );
          const pokemonWeaknessArray = [];
          weaknesses.map((weakness) => {
            weakness.map((type) => {
              //Set the weaknesses of the pokemon
              pokemonWeaknessArray.push(type.name);
              //setPokemonWeakness([...pokemonWeakness, type.name]);
            });
          });
          setPokemonWeakness(pokemonWeaknessArray);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  const handlePreviousPokemon = (ev) => {
    ev.preventDefault();
    const previousPokemon = Number(pokemon.id) - 1;
    history.push(`/pokemon/${previousPokemon}`);
  };

  const handleNextPokemon = (ev) => {
    ev.preventDefault();
    const nextPokemon = Number(pokemon.id) + 1;
    history.push(`/pokemon/${nextPokemon}`);
  };

  const addToFavorites = (ev) => {
    ev.preventDefault();
    //change the button text
    setButtonText("Added ❤");
    const body = { pokedexNumber: pokemon.id };
    const username = CurrentUserstate.user.user.username;
    fetch(`/users/favoritepokemons/${username}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const { status, message } = res;
        if (status === 201) {
          console.log("CONFIRMED", message);
        } else if (status === 500) {
          console.log("ERROR", message);
        }
      });
  };

  const removeFromFavorites = (ev) => {};

  useEffect(() => {
    fetchPokemonInfo();
  }, [pokedexNumber]);

  useEffect(() => {
    getPokemonTypesInfo();
  }, [pokemon, pokedexNumber]);

  //-------Console logs----------
  //console.log("CURRENT USER STATE", CurrentUserstate);

  if (pokemon && pokemonInfo && pokemonWeakness) {
    return (
      <>
        <ButtonsWrapper>
          <PreviousWrapper>
            <Button
              color="red"
              text="< Previous Pokemon"
              handleClick={handlePreviousPokemon}
            />
          </PreviousWrapper>
          <NextWrapper>
            <Button
              color="red"
              text="Next Pokemon >"
              handleClick={handleNextPokemon}
            />
          </NextWrapper>
        </ButtonsWrapper>
        <Wrapper bgColor={setBackgroundColor(pokemonInfo.color.name)}>
          {/* {CurrentUserstate.favoritePokemons.includes(pokemon.id) ? (
            <HeartWrapper>
              <Button
                handleClick={removeFromFavorites}
                text="Remove from favorites ❤"
              />
            </HeartWrapper>
          ) : ( */}
          {CurrentUserstate.user.user.username.length > 0 && (
            <HeartWrapper>
              <Button handleClick={addToFavorites} text={buttonText} />
            </HeartWrapper>
          )}
          {/* )} */}
          <Title>
            {pokemon.name} #{pokemon.id}
          </Title>
          <SecondWrapper>
            <ImageWrapper bgColor={setBackgroundColor(pokemonInfo.color.name)}>
              <Image
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={`${pokemon.name}`}
              />
            </ImageWrapper>
            <div>
              <FlavorText>
                {pokemonInfo.flavor_text_entries[6].flavor_text}
              </FlavorText>
              <InfoWrapper bgColor={setBackgroundColor(pokemonInfo.color.name)}>
                <StatKey>
                  <span>Height:</span>{" "}
                  <StatValue>{pokemon.height * 10} cm</StatValue>
                </StatKey>
                <StatKey>
                  <span>Weight:</span>{" "}
                  <StatValue>{pokemon.weight / 10} kg</StatValue>
                </StatKey>
                <StatKey>
                  Abilities:{" "}
                  {pokemon.abilities.map((ability) => {
                    return <StatValue>{ability.ability.name}</StatValue>;
                  })}
                </StatKey>
              </InfoWrapper>
              <Types>Types:</Types>
              {pokemon.types.map((type) => {
                return <PokemonType type={type.type.name} size="large" />;
              })}
              <Types>Weaknesses:</Types>
              {pokemonWeakness.map((type) => {
                return <PokemonType type={type} size="large" />;
              })}
            </div>
          </SecondWrapper>
          <EvolutionCard
            evolutionChainLink={pokemonInfo.evolution_chain.url}
            color={pokemonInfo.color.name}
          />
        </Wrapper>
      </>
    );
  } else {
    return <div>... loading</div>;
  }
};

export default PokemonInfoPage;

const Wrapper = styled.div`
  position: relative;
  color: black;
  padding: 16px 16px 40px 16px;
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.backgroundColor};
  box-shadow: 3px 2.8px 2.2px rgba(0, 0, 0, 0.07),
    3px 6.7px 5.3px rgba(0, 0, 0, 0.05), 3px 12.5px 10px rgba(0, 0, 0, 0.042),
    3px 22.3px 17.9px rgba(0, 0, 0, 0.035),
    3px 41.8px 33.4px rgba(0, 0, 0, 0.028), 3px 100px 80px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  text-align: center;
  width: 70%;
  margin: auto;
  margin-top: 60px;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 35px;
`;

const PreviousWrapper = styled.div`
  width: 10%;
`;

const NextWrapper = styled.div`
  width: 10%;
`;
const HeartWrapper = styled.div`
  position: absolute;
  top: 11px;
  right: 11px;
`;

const ImageWrapper = styled.div`
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.secondaryColor};
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 1000px) {
    display: flex;
    justify-content: center;
  }
`;

const SecondWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  display: block;
  max-width: 100%;

  @media (min-width: 1000px) {
    width: 700px;
    height: auto;
  }
`;

const Title = styled.h2`
  margin-bottom: 12px;
  margin-top: 8px;
  font-size: 35px;
  font-weight: 600;
`;

const FlavorText = styled.div`
  margin-bottom: 12px;
  margin-top: 8px;
  margin-left: 20px;
  font-size: 23px;
  font-weight: 500;
  text-align: left;
`;

const InfoWrapper = styled.div`
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.secondaryColor};
  font-size: 23px;
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  margin: 30px 20px 40px 30px;
  padding: 15px;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

const StatKey = styled.span`
  color: white;
  display: block;
`;

const StatValue = styled.p`
  color: black;
  font-size: 23px;
  margin: 10px 0 0 0;
`;

const Types = styled.div`
  text-align: left;
  font-size: 26px;
  margin: 0 0 10px 45px;
`;
