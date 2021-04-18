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

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button handleClick={pushToLogIn} text="log in" />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default NavigationBar;

const Wrapper = styled.div`
  background-color: #ff6961;
  border-bottom: 12px solid rgba(0, 0, 0, 0.1);
  height: 150px;
`;

const ButtonWrapper = styled.div`
  width: 15%;
  margin-left: auto;
  margin-right: 0;
  padding-top: 38px;
`;
