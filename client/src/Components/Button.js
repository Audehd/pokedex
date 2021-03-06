import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";

const Button = ({ handleClick, text, disabled, tippyContent, color }) => {
  if (color === "red") {
    return (
      <Tippy content={<span>{tippyContent}</span>}>
        <div disabled={!disabled}>
          <RedButton disabled={disabled} onClick={handleClick}>
            {text}
          </RedButton>
        </div>
      </Tippy>
    );
  } else {
    return (
      <Tippy content={<span>{tippyContent}</span>}>
        <div disabled={!disabled}>
          <LargeButton disabled={disabled} onClick={handleClick}>
            {text}
          </LargeButton>
        </div>
      </Tippy>
    );
  }
};
//if div is disabled, could cause problem with button

export default Button;

const LargeButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  border: 4px solid #ffe662;
  border-radius: 12px;
  background: #fdfd96;
  color: black;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const RedButton = styled(LargeButton)`
  border: 4px solid rgba(0, 0, 0, 0.1);
  background: #ff6961;
`;
