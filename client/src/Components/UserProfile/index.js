import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import PokemonTeamCard from "../PokemonTeamCard";

import femaleTrainer from "../../assets/images/female_trainer.png";
import maleTrainer from "../../assets/images/male_trainer.png";

const UserProfile = () => {
  //State for all pokemon teams (for the current user profile)
  const [pokemonTeams, setPokemonTeams] = useState();
  //State for user information
  const [userInformation, setUserInformation] = useState();
  //State for favorite pokemon
  const [favoritePokemons, setFavoritePokemons] = useState();
  //username for current user profile
  let { username } = useParams();

  //function to fetch that user's pokemon teams
  const getUserPokemonTeams = () => {
    fetch(`/teams/user/${username}`)
      .then((res) => res.json())
      .then((res) => {
        //returns an array of pokemon teams
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

  const getUserInformation = async () => {
    await fetch(`/users/username/${username}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserInformation(res.data);

        fetch("/pokemons/pokemon/name", {
          method: "POST",
          body: JSON.stringify(res.data.favoritePokemons),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setFavoritePokemons(res.data);
          })
          .catch((error) => {
            console.log("Error", error);
          });
      });
  };

  useEffect(() => {
    getUserPokemonTeams();
    getUserInformation();
  }, [username]);

  //------console.logs
  console.log("user profile information", userInformation);
  console.log("user favorites", favoritePokemons);

  if (pokemonTeams && userInformation && favoritePokemons) {
    return (
      <Wrapper>
        <Title>{username}'s profile</Title>
        <SecondWrapper>
          {userInformation.gender === "female" ? (
            <Img src={femaleTrainer} alt="male pokemon trainer"></Img>
          ) : (
            <Img src={maleTrainer} alt="male pokemon trainer"></Img>
          )}
          <InfoWrapper>
            <TextWrapper>
              <StatKey>
                <span>Name:</span> <StatValue>{username}</StatValue>
              </StatKey>
              <StatKey>
                <span>City:</span> <StatValue>{userInformation.city}</StatValue>
              </StatKey>
            </TextWrapper>

            <FavePokemonWrapper>
              <FaveTitle>Favorite Pokemons</FaveTitle>
              {favoritePokemons.map((pokemon) => {
                return (
                  <>
                    <FavePokemonImg
                      src={pokemon.sprites.front_default}
                      alt={`${pokemon.species.name}`}
                    />
                  </>
                );
              })}
            </FavePokemonWrapper>
          </InfoWrapper>
        </SecondWrapper>
        <TeamsWrapper>
          {pokemonTeams.map((team) => {
            return (
              <PokemonTeamCard key={team.id} team={team} teamOwner={username} />
            );
          })}
        </TeamsWrapper>
      </Wrapper>
    );
  } else {
    return <div>... Loading</div>;
  }
};

export default UserProfile;

const Wrapper = styled.div`
  color: black;
  padding: 16px 16px 40px 16px;
  background: #c493c3;
  box-shadow: 3px 2.8px 2.2px rgba(0, 0, 0, 0.07),
    3px 6.7px 5.3px rgba(0, 0, 0, 0.05), 3px 12.5px 10px rgba(0, 0, 0, 0.042),
    3px 22.3px 17.9px rgba(0, 0, 0, 0.035),
    3px 41.8px 33.4px rgba(0, 0, 0, 0.028), 3px 100px 80px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  border: 7px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 70%;
  margin: auto;
  margin-top: 60px;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

const TeamsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(410px, 1fr));
  grid-gap: 24px;
  width: 70%;
  margin: auto;
  margin-top: 80px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 12px;
  margin-top: 8px;
  font-size: 35px;
  font-weight: 600;
`;

const SecondWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Img = styled.img`
  background: #e3c1e2;
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  width: 250px;
  height: auto;
  padding: 10px 15px;
`;

const InfoWrapper = styled.div`
  background: #e3c1e2;
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

const TextWrapper = styled.div`
  padding: 20px;
`;

const StatKey = styled.span`
  color: white;
  line-height: 1.6;
  display: block;
  text-align: left;
`;

const StatValue = styled.span`
  color: black;
  font-size: 23px;
  line-height: 1.6;
  text-align: left;
  margin: 0 0 0 7px;
`;

const FavePokemonWrapper = styled.div`
  display: block;
  padding: 20px;
`;

const FaveTitle = styled.p`
  color: white;
  margin: 0 0 15px 0;
`;

const FavePokemonImg = styled.img``;
