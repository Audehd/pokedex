import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";

import Button from "../Button";
import Input from "./Input";

import {
  addPokemonToTeam,
  editTeamName,
  stopTeam,
} from "../../reducers/teamsActions";

import { allPokemonList } from "../../Data";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
  },
};

const initialTeamState = {
  pokemonName: "",
  pokedexNumber: "",
  nickname: "",
  nature: "",
  helditem: "",
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const AddTeamModal = ({ newTeam, setNewTeam }) => {
  //state for Pokemon natures list
  const [natures, setNatures] = useState();
  //state for the add pokemon to team form
  const [teamData, setTeamData] = useState(initialTeamState);
  //state for team name
  const [teamName, setTeamName] = useState();
  //state for pokemon nature (user selects from dropdown menu)
  const [nature, setNature] = useState();
  //state for pokemon pokedexNumber (user selects from dropdown menu)
  const [pokedexNumber, setPokedexNumber] = useState();
  //States for the current logged in user and their teams
  const currentUserstate = useSelector((state) => state.user);
  const currentTeamstate = useSelector((state) => state.teams);

  //State for team
  const teams = useSelector((state) => state.teams);

  const dispatch = useDispatch();

  //Message box that displays the team name after the user chooses one (for creating a new team)
  const teamNameBox = useRef(null);
  //Message box that displays the Pokemons added so far
  const pokemonAddedBox = useRef(null);

  //function to get pokemon natures list
  const getNaturesList = () => {
    fetch("/natures")
      .then((res) => res.json())
      .then((res) => {
        setNatures(res.data.results);
      });
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
    //we need to do this to clear the state otherwise after sumbit the pokemon "stay"
    //everytime we open the modal we want a fresh team state
    dispatch(stopTeam(teamName));
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    //return to initial state for pokemon team
    dispatch(stopTeam(teamName));
    setIsOpen(false);
  };

  //function to set the team name
  const handleTeamName = (value) => {
    setTeamName(value);
  };

  //function to set the nature of the pokemon (from a dropdown menu)
  const handleNatureSelect = (value) => {
    setNature(value);
  };

  const handlePokemonSelect = (value) => {
    setPokedexNumber(value);
  };

  //function to change the team info from the text fields
  const handleChange = (value, name) => {
    console.log(value, name);
    setTeamData({ ...teamData, [name]: value });
  };

  //function that add a new pokemon to the team
  //send to dispatch the team name and pokemon info
  const handleSubmitPokemon = (ev) => {
    ev.preventDefault();
    dispatch(editTeamName(teamName));
    dispatch(addPokemonToTeam(teamData, nature, pokedexNumber));
    //------------------------------------------------
    //disable and hide the team name field
    //teamNameTextField.current.style.display = "none";
    //show the team name in team name box
    teamNameBox.current.style.display = "block";
    teamNameBox.current.innerHTML = teamName;
    //show pokemon added to the team so far
    //pokemonAddedBox.current.style.display = "block";
    //teamNameBox.current.innerHTML = currentTeamstate.team.map(
    // (pokemon) => pokemon.pokemonName
    //);
  };

  //Function that sends the new team data to the server
  //Send the user info and the team info
  //Button is disabled until user adds at least one Pokemon
  const handleSubmitTeam = (ev) => {
    ev.preventDefault();
    setIsOpen(false);
    setNewTeam(!newTeam);
    const body = { user: currentUserstate.user, team: currentTeamstate };
    console.log(body);
    fetch("/teams/addteam", {
      method: "POST",
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

  useEffect(() => {
    getNaturesList();
  }, [modalIsOpen]);

  return (
    <div>
      <CreateTeamButtonWrapper>
        <Button handleClick={openModal} text="Create a new team"></Button>
      </CreateTeamButtonWrapper>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ButtonWrapper>
          <Button handleClick={closeModal} text="Close"></Button>
        </ButtonWrapper>
        <TeamName
          ref={teamNameBox}
          id="teamNameBox"
          name="teamNameBox"
        ></TeamName>
        <pokemonAddedBox
          ref={pokemonAddedBox}
          id="pokemonAddedBox"
          name="pokemonAddedBox"
        ></pokemonAddedBox>
        <form>
          <Input
            required="required"
            name="newTeamName"
            placeholder="Team Name"
            type="text"
            handleChange={handleTeamName}
          />
          <Label>Pokemon Name</Label>
          {allPokemonList ? (
            <Select onChange={(ev) => handlePokemonSelect(ev.target.value)}>
              <option key={0}>Select a Pokemon</option>
              {allPokemonList.map((pokemon) => {
                return (
                  <option
                    key={pokemon.pokedexNumber}
                    value={pokemon.pokedexNumber}
                    name={pokemon.name}
                  >
                    {pokemon.name}
                  </option>
                );
              })}
            </Select>
          ) : (
            <p>...Loading</p>
          )}
          <Input
            required="required"
            name="nickname"
            placeholder="Nickname"
            type="text"
            handleChange={handleChange}
            value={teamData.nickname}
          />
          <Label>Nature</Label>
          {natures ? (
            <Select onChange={(ev) => handleNatureSelect(ev.target.value)}>
              <option key={0}>Select a nature</option>
              {natures.map((nature) => {
                return (
                  <option key={nature.name} value={nature.name}>
                    {nature.name}
                  </option>
                );
              })}
            </Select>
          ) : (
            <p>...Loading</p>
          )}
          <Input
            required="required"
            name="helditem"
            placeholder="Held Item"
            type="text"
            handleChange={handleChange}
            value={teamData.helditem}
          />
          <ButtonWrapper>
            <Button
              disabled={currentTeamstate.team.length === 6}
              handleClick={handleSubmitPokemon}
              text="Add Pokemon to team"
              tippyContent="You cannot add more than 6 Pokemon"
            ></Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              disabled={currentTeamstate.team.length === 0}
              handleClick={handleSubmitTeam}
              text="Submit Team"
              tippyContent="Add at least one Pokemon to your team"
            ></Button>
          </ButtonWrapper>
        </form>
      </Modal>
    </div>
  );
};

export default AddTeamModal;

const CreateTeamButtonWrapper = styled.div`
  width: 25%;
  margin: 30px auto 40px auto;
`;

const ButtonWrapper = styled.div`
  width: 60%;
  margin: 20px auto 40px auto;
`;

const Select = styled.select`
  border-radius: 12px;
  border: 2px solid black;
  box-sizing: border-box;
  color: #464a5c;
  font-size: 17px;
  font-weight: 300;
  height: 54px;
  //padding: 8px 12px 10px 12px;
  width: 100%;

  option {
    color: black;
    background: white;
  }
`;

const Label = styled.p`
  font-size: 21px;
  padding-bottom: 5px;
`;

const TeamName = styled.div`
  display: none;
  font-weight: 500;
  font-size: 20px;
  color: black;
  text-align: center;
  background-color: pink;
  padding-bottom: 10px 20px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  max-height: 90px;
  width: 100%;
  margin: 30px 0;
`;

const pokemonAddedBox = styled.div`
  display: none;
  font-weight: 500;
  font-size: 20px;
  color: black;
  text-align: center;
  background-color: pink;
  padding-bottom: 10px 20px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  max-height: 90px;
  width: 100%;
  margin: 30px 0;
`;
