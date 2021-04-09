import React, { useState } from "react";
import styled from "styled-components";

import Input from "../UserSignUpPage/Input";

const UserSignIn = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (value, item) => {
    setFormData({ ...formData, [item]: value });
  };

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
        const { status, message } = res;
        if (status === 201) {
          console.log("CONFIRMED", message);
        } else if (status === 500) {
          console.log("ERROR", message);
        }
      });
  };

  return (
    <>
      <div>USER SIGN IN</div>
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
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default UserSignIn;
