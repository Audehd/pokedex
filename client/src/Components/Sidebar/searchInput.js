import React from "react";
import styled from "styled-components";

const SearchInput = ({
  name,
  type,
  placeholder,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{placeholder}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(ev) => handleChange(ev.target.value)}
        onKeyPress={(ev) => ev.key === "Enter" && handleSubmit(ev)}
      />
    </Wrapper>
  );
};

export default SearchInput;

const Wrapper = styled.div`
  width: 90%;
  position: relative;

  label {
    display: none;
  }

  input {
    border-radius: 12px;
    border: 3px solid black;
    box-sizing: border-box;
    color: #464a5c;
    font-size: 17px;
    font-weight: 300;
    height: 54px;
    padding: 8px 12px 10px 12px;
    width: 100%;

    &::placeholder {
      color: #999;
    }
  }
`;
