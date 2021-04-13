import React from "react";

const Button = ({ handleClick, text, disabled }) => {
  return (
    <button disabled={disabled} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
