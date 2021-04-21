import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Button from "../Button";
import { greetings } from "../../Data";

import { logout } from "../../reducers/actions";

const NavigationBar = () => {
  //State for the current logged in user
  const CurrentUserstate = useSelector((state) => state);

  const dispatch = useDispatch();
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

  const logOut = () => {
    dispatch(logout(CurrentUserstate.user));
    localStorage.clear();
    history.push("/");
  };

  //Selects a random greeting to show the user
  let greeting = greetings[Math.floor(Math.random() * greetings.length)];

  //-------console logs
  console.log("USER STATE", CurrentUserstate);

  if (CurrentUserstate.user.user.username.length > 0) {
    return (
      <Wrapper>
        <SecondWrapper>
          <div>
            <Greeting>Welcome {CurrentUserstate.user.user.username}</Greeting>
            <Question>{greeting}</Question>
          </div>
          <ButtonWrapper>
            <Button handleClick={pushToTeamsPage} text="My Pokémon teams" />
          </ButtonWrapper>
          <ButtonWrapper>
            <Button handleClick={pushToProfilePage} text="Profile" />
          </ButtonWrapper>
          <ButtonWrapper>
            <Button handleClick={logOut} text="Log out" />
          </ButtonWrapper>
        </SecondWrapper>
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

const SecondWrapper = styled.div`
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

const Greeting = styled.div`
  font-size: 35px;
  font-weight: 400;
  padding-top: 38px;
  margin-left: 20px;
`;

const Question = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 400;
  margin-left: 20px;
  padding-top: 5px;
`;
