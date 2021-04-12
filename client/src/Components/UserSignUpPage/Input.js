import React from "react";
import styled from "styled-components";

const Input = ({ name, type, placeholder, handleChange, value }) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{placeholder}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(ev) => handleChange(ev.target.value, name)}
        value={value}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 6px;
  width: 100%;
  position: relative;

  label {
    display: none;
  }

  input {
    border-radius: 3px;
    border: 1px solid black;
    box-sizing: border-box;
    color: #464a5c;
    font-size: 16px;
    font-weight: 300;
    height: 44px;
    padding: 8px 12px 10px 12px;
    width: 100%;

    &::placeholder {
      color: #999;
    }
  }
`;

export default Input;
