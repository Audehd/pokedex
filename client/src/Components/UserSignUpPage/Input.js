import React from "react";
import styled from "styled-components";

const Input = ({
  refProp,
  name,
  type,
  placeholder,
  handleChange,
  value,
  required,
}) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{placeholder}</label>
      <input
        ref={refProp}
        required={required}
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
    font-size: 21px;
    padding-bottom: 5px;
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
    margin-top: 5px;

    &::placeholder {
      color: #999;
    }
  }
`;

export default Input;
