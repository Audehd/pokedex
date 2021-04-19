import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import Button from "../Button";
import Input from "./Input";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const initialState = {
  user: "",
  teamName: "",
  team: [
    {
      pokemonName: "",
      pokedexNumber: "",
      nickname: "",
      nature: "",
      helditem: "",
    },
  ],
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const AddTeamModal = () => {
  //state for the add pokemon to team form
  const [formData, setFormData] = useState(initialState);
  //state for POkemon natures list
  const [natures, setNatures] = useState();

  //function to get pokemon natures list
  const getNaturesList = () => {
    fetch("/natures")
      .then((res) => res.json)
      .then((res) => {
        setNatures(res.data.results);
      });
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (value, item) => {
    setFormData({ ...formData, [item]: value });
  };

  //-------Console logs
  console.log("NATURES LIST", natures);

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
          <Button onClick={closeModal} text="Close"></Button>
        </ButtonWrapper>
        <form>
          <Input
            required="required"
            name="pokemonName"
            placeholder="Pokemon Name"
            type="text"
            handleChange={handleChange}
            //value={formData.pokemonName}
          />
          <Input
            required="required"
            name="pokedexNumber"
            placeholder="Pokedex Number"
            type="text"
            handleChange={handleChange}
            //value={formData.pokedexNumber}
          />
          <Input
            required="required"
            name="nickname"
            placeholder="Nickname"
            type="text"
            handleChange={handleChange}
            //value={formData.nickname}
          />
          <Input
            required="required"
            name="nature"
            placeholder="Nature"
            type="text"
            handleChange={handleChange}
            //value={formData.nature}
          />
          <Input
            required="required"
            name="helditem"
            placeholder="Held Item"
            type="text"
            handleChange={handleChange}
            //value={formData.helditem}
          />
          <ButtonWrapper>
            <Button text="Add Pokemon to team"></Button>
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
