import React from "react";
import styled from "styled-components";

const Button = ({ handleClick, text, disabled }) => {
  return (
    <LargeButton disabled={disabled} onClick={handleClick}>
      {text}
    </LargeButton>
  );
};

export default Button;

const LargeButton = styled.button`
  position: relative;
  display: block;
  width: 80%;
  border: 4px solid #ffe662;
  border-radius: 12px;
  background: #fdfd96;
  color: black;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;
