import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FiX } from "react-icons/fi";

import LittlePokemonCard from "./LittlePokemonCard";
import Button from "../Button";

import { removePokemonFromTeam } from "../../reducers/teamsActions";

const PokemonTeamCard = ({ team, teamOwner }) => {
  //State for Pokemon teams info
  const [teamInfo, setTeamInfo] = useState([]);
  //State for the little POKEMON X icon, to show only if user click edit team button
  const [fiShow, setFiShow] = useState(false);
  //State for the little TEAM X icon, to show only if user click edit team button
  const [fiTeamShow, setFiTeamShow] = useState(false);
  //State for the current logged in user
  const CurrentUserstate = useSelector((state) => state);
  //State for team
  const teams = useSelector((state) => state.teams);

  const dispatch = useDispatch();

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

  //function when user click the edit team button
  const handleClickEditTeam = (ev) => {
    ev.preventDefault();
    //Make little X appear in the top right corner to remove a pokemon
    setFiShow(true);
    setFiTeamShow(true);
  };

  //function to remove one pokemon from the team (when user clicks X button)
  const handleRemovePokemon = (ev, teamId, pokemon) => {
    ev.preventDefault();
    const body = {
      pokemonNumber: pokemon,
    };
    fetch(`/teams/removePokemon/${teamId}`, {
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
          //console.log("CONFIRMED", message);
        } else if (status === 500) {
          //console.log("ERROR", message);
        }
      });
  };

  //function to delete an entire team when user clicks X button
  const handleDeleteTeam = (ev, teamId) => {
    ev.preventDefault();
    const body = {
      teamId: teamId,
    };
    fetch(`/teams/deleteteam/${teamId}`, {
      method: "DELETE",
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

  //function to edit the team, when user presses submit button.
  const handleEditTeam = (ev) => {
    ev.preventDefault();
    const body = team.id;
    fetch("/teams/editteam", {
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

  //-------Console logs
  //console.log("team", team);

  if (updatedTeam) {
    return (
      <Wrapper>
        {fiTeamShow && (
          <FiButton onClick={(ev) => handleDeleteTeam(ev, team.id)}>
            <FiX />
          </FiButton>
        )}
        <TeamName>{team.teamName}</TeamName>
        {teamOwner === "me" && (
          <ButtonWrapper>
            <Button text="edit team" handleClick={handleClickEditTeam} />
          </ButtonWrapper>
        )}
        {updatedTeam.map((pokemon) => {
          return (
            <LittlePokemonCard
              teamId={team.id}
              pokemon={pokemon}
              fiShow={fiShow}
              handleClick={handleRemovePokemon}
            />
          );
        })}
      </Wrapper>
    );
  } else {
    return <div>... Loading</div>;
  }
};

export default PokemonTeamCard;

const Wrapper = styled.div`
  position: relative;
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

const TeamName = styled.p`
  font-size: 22px;
  font-weight: 500;
  color: black;
  text-align: center;
  margin: 0 0 25px 0;
`;

const ButtonWrapper = styled.div`
  width: 30%;
`;

const FiButton = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  margin-right: 0px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
`;
