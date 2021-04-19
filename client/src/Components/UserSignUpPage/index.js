import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Input from "./Input";
import Button from "../Button";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const UserSignUpForm = () => {
  const [formData, setFormData] = useState(initialState);
  //Set the form submit button to disabled by default unless all required fields are filled out
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    // This useEffect is listening to state changes and verifying if all the required fields are filled out
    //if all the required fields are filled out, the button is set to enabled
    Object.values(formData).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [formData, setDisabled]);

  const handleChange = (value, item) => {
    setFormData({ ...formData, [item]: value });
  };

  //Error box that displays a message if there is a mistake in the form
  const errorBox = useRef(null);
  //Username, email, password and confirm password fields
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    //Email validation
    const emailParts = formData.email.split("@");
    if (
      emailParts.length < 2 ||
      emailParts[0].length === 0 ||
      emailParts[1].length === 0 ||
      formData.email.includes(".com") === false
    ) {
      errorBox.current.style.display = "block";
      errorBox.current.innerHTML = "Email is not a valid email format";
      email.current.style.border = "#fdfd96 6px solid";
      email.current.focus();
    } //Check if username is at least 3 characters
    else if (formData.username.length < 3) {
      errorBox.current.style.display = "block";
      errorBox.current.innerHTML =
        "Please enter a username that is at least 3 characters long";
      username.current.style.border = "#fdfd96 6px solid";
      username.current.focus();
    } //Check if username contains invalid characters, only letters and numbers are accepted.
    //uppercase letters are accepted but in the server the usename gets converted to lowercase before being sent to the database
    else if (/[^a-zA-Z0-9]/.test(formData.username)) {
      errorBox.current.style.display = "block";
      errorBox.current.innerHTML =
        "Username contains invalid characters. Please only user letters and numbers";
      username.current.style.border = "#fdfd96 6px solid";
    }
    //check if password is at least 6 characters
    else if (formData.password.length < 6) {
      console.log("password", password);
      errorBox.current.style.display = "block";
      errorBox.current.innerHTML =
        "Your password is too short! Please provide a password that is at least 6 characters long.";
      password.current.style.border = "#fdfd96 6px solid";
      password.current.focus();
    }
    //check if passwords match
    else if (formData.password !== formData.confirmPassword) {
      errorBox.current.style.display = "block";
      errorBox.current.innerHTML =
        "Your passwords didn't match! Please provide the same passwords in each field";
      confirmPassword.current.style.border = "#fdfd96 6px solid";
      confirmPassword.current.focus();
    } else {
      //If all fields are filled out and valid then send the user information to the server
      fetch("/users", {
        method: "POST",
        body: JSON.stringify(formData),
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
            //log in the new user
            //localStorage.setItem("userEmail", formData.email);
            history.push("/");
          } else if (status === 500) {
            console.log("ERROR", message);
          }
        });
    }
  };

  return (
    <Wrapper>
      <form>
        <Input
          refProp={username}
          required="required"
          name="username"
          placeholder="Username"
          type="text"
          handleChange={handleChange}
          value={formData.firstName}
        />
        <Input
          refProp={email}
          required="required"
          name="email"
          placeholder="Email"
          type="email"
          handleChange={handleChange}
          value={formData.email}
        />
        <Input
          refProp={password}
          required="required"
          name="password"
          placeholder="Password"
          type="password"
          handleChange={handleChange}
          value={formData.password}
        />
        <Input
          refProp={confirmPassword}
          required="required"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          handleChange={handleChange}
          value={formData.confirmPassword}
        />
        <ButtonWrapper>
          <Button
            handleClick={handleSubmit}
            disabled={disabled}
            text="submit"
          />
        </ButtonWrapper>
      </form>
      <Error ref={errorBox} id="error" name="error"></Error>
    </Wrapper>
  );
};

export default UserSignUpForm;

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  margin: 0 auto;
  width: 30%;
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
  max-height: 90px;
  width: 100%;
  margin: 30px 0;
`;
