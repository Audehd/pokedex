import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Input from "../UserSignUpPage/Input";

import Button from "../Button";

import { login } from "../../reducers/actions";

const UserSignIn = () => {
  //State for the form data
  const [formData, setFormData] = useState({});

  //Error box that displays a message if there is a mistake in the form
  const errorBox = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const pushToSignUp = () => {
    history.push("/signup");
  };

  //function to update form data state when user types something in the fields
  const handleChange = (value, item) => {
    setFormData({ ...formData, [item]: value });
  };

  //Funtion to log the user in
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/users/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const { status, data, message } = res;
        if (status === 201) {
          console.log("CONFIRMED", message);
          const user = data;
          dispatch(login(user));
          //update local storage with user email
          localStorage.setItem("userEmail", user.email);
          history.push("/");
        } else if (status === 500) {
          console.log("ERROR", message);
        }
      });
  };

  return (
    <Wrapper>
      <Input
        name="username"
        placeholder="Username"
        type="text"
        handleChange={handleChange}
        value={formData.firstName}
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        handleChange={handleChange}
        value={formData.password}
      />
      <ButtonWrapper>
        <Button text="Submit" handleClick={handleSubmit}>
          Submit
        </Button>
      </ButtonWrapper>
      <SignUpWrapper>
        <Message>Don't have an account?</Message>
        <ButtonWrapper>
          <Button text="Signup" handleClick={pushToSignUp}>
            Submit
          </Button>
        </ButtonWrapper>
      </SignUpWrapper>
      <Error ref={errorBox} id="error" name="error"></Error>
    </Wrapper>
  );
};

export default UserSignIn;

const Wrapper = styled.div`
  margin: 300px auto;
  width: 500px;
  background-color: #ff6961;
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 60px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0 0 0;
`;

const SignUpWrapper = styled.div`
  display: block;
`;

const Message = styled.p`
  font-size: 22px;
  font-weight: 400;
  margin: 15px auto;
`;

const Error = styled.div`
  display: none;
  font-weight: 500;
  font-size: 20px;
  color: black;
  text-align: center;
  background-color: pink;
  padding-bottom: 10px 20px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 70px;
  width: 100%;
  margin: 30px 0;
`;
