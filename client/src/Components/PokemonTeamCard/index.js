import React, { useState, useEffect } from "react";
import styled from "styled-components";

import LittlePokemonCard from "./LittlePokemonCard";

const PokemonTeamCard = ({ team }) => {
  //State for Pokemon teams info
  const [teamInfo, setTeamInfo] = useState([]);

  const teamPokedexNumbers = team.team.map((pokemon) => pokemon.pokedexNumber);

  //get pokemon by name funtion, accepts an array of names or numbers (pokedex numbers)
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
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getPokemonsByName(teamPokedexNumbers, setTeamInfo);
  }, []);

  //merge the teamInfo and team arrays together (so we can loop over only one array)
  const updatedTeam = teamInfo.map((pokemon, i) =>
    Object.assign({}, pokemon, team.team[i])
  );

  //-------Console logs
  console.log("TEAM INFO FROM TEAM CARD", team);
  //console.log("TEAM POKEDEX NUMBERS", teamPokedexNumbers);
  //console.log("UPDATED TEAM", updatedTeam);
  console.log("team ids", team.teamId);

  if (updatedTeam) {
    return (
      <Wrapper>
        <TeamName>{team.teamName}</TeamName>
        {updatedTeam.map((pokemon) => {
          return <LittlePokemonCard pokemon={pokemon} />;
        })}
      </Wrapper>
    );
  } else {
    return <div>... Loading</div>;
  }
};

export default PokemonTeamCard;

const Wrapper = styled.div`
  text-decoration: none;
  color: black;
  padding: 16px;
  background-color: #ff6961;
  border: 8px solid rgba(0, 0, 0, 0.1);
  box-shadow: 3px 2.8px 2.2px rgba(0, 0, 0, 0.07),
    3px 6.7px 5.3px rgba(0, 0, 0, 0.05), 3px 12.5px 10px rgba(0, 0, 0, 0.042),
    3px 22.3px 17.9px rgba(0, 0, 0, 0.035),
    3px 41.8px 33.4px rgba(0, 0, 0, 0.028), 3px 100px 80px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  text-align: center;
  width: 450px;
`;

const TeamName = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: black;
  text-align: center;
  margin: 0 0 25px 0;
`;
