import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Button from "../Button";

const NavigationBar = () => {
  //State for the current logged in user
  const CurrentUserstate = useSelector((state) => state);

  const history = useHistory();

  const pushToLogIn = () => {
    history.push("/signin");
  };

  const pushToTeamsPage = () => {
    history.push("/myteams");
  };

  const pushToProfilePage = () => {
    history.push("/profile");
  };

  console.log("USER STATE", CurrentUserstate);

  if (CurrentUserstate) {
    return (
      <Wrapper>
        <ButtonsWrapper>
          <ButtonWrapper>
            <Button handleClick={pushToTeamsPage} text="My Pokémon teams" />
          </ButtonWrapper>
          <ButtonWrapper>
            <Button handleClick={pushToProfilePage} text="Profile" />
          </ButtonWrapper>
        </ButtonsWrapper>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <ButtonWrapper>
          <Button handleClick={pushToLogIn} text="log in" />
        </ButtonWrapper>
      </Wrapper>
    );
  }
};

export default NavigationBar;

const Wrapper = styled.div`
  background-color: #ff6961;
  border-bottom: 12px solid rgba(0, 0, 0, 0.1);
  height: 150px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonWrapper = styled.div`
  width: 15%;
  //border: 2px solid black;
  margin-left: auto;
  margin-right: 20px;
  padding-top: 38px;
`;
