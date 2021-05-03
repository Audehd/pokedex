import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import PokemonTeamCard from "../PokemonTeamCard";
import AddTeamModal from "./AddTeamModal";

const PokemonTeamPage = () => {
  //State for the current logged in user
  const currentUserstate = useSelector((state) => state.user);
  //State for newTeam (so we add to dependency array)
  const [newTeam, setNewTeam] = useState(false);
  //State for all pokemon teams (for the logged in user)
  const [pokemonTeams, setPokemonTeams] = useState();

  //function to fetch user team information
  const getUserTeams = () => {
    const username = currentUserstate.user.username;
    fetch(`/teams/user/${username}`)
      .then((res) => res.json())
      .then((res) => {
        //returns an array of pokemon teams
        console.log("NEW RES", res.data);
        //setPokemonTeams(res.data.map((each) => each.team));
        setPokemonTeams(
          res.data.map((each) => {
            return {
              id: each._id,
              teamName: each.team.teamName,
              team: each.team.team,
            };
          })
        );
      });
  };

  useEffect(() => {
    getUserTeams();
  }, [currentUserstate, newTeam]);

  //-------Console logs
  //console.log("Current user", currentUserstate);
  //console.log("Current user teams", pokemonTeams);

  if (pokemonTeams) {
    return (
      <>
        <Title>My Pokemon teams</Title>
        <AddTeamModal setNewTeam={setNewTeam} newTeam={newTeam} />
        <Wrapper>
          {pokemonTeams.map((team) => {
            //if a team is empty do not show it.
            if (team.team.length > 0)
              return (
                <PokemonTeamCard
                  setNewTeam={setNewTeam}
                  newTeam={newTeam}
                  key={team.id}
                  team={team}
                  teamOwner={"me"}
                />
              );
          })}
        </Wrapper>
      </>
    );
  } else {
    return <div>... Loading</div>;
  }
};

export default PokemonTeamPage;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(410px, 1fr));
  grid-gap: 24px;
  width: 70%;
  margin: auto;
  margin-top: 80px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  margin: 30px 0 0 0;
`;
