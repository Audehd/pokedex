import React from "react";
import styled from "styled-components";

const PokemonType = ({ type, size }) => {
  //This functions takes the type as parameter and determines the background and text colors
  const setColors = (type) => {
    if (type) {
      switch (type) {
        case "normal": {
          let backgroundColor = "#A4ACAF";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "fighting": {
          let backgroundColor = "#D56723";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "flying": {
          let backgroundColor = "#7ae1ff";
          let textColor = "black";
          return { backgroundColor, textColor };
        }
        case "poison": {
          let backgroundColor = "#B97FC9";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "ground": {
          let backgroundColor = "#E09C3D";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "rock": {
          let backgroundColor = "#D8843D";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "bug": {
          let backgroundColor = "#96c95d";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "ghost": {
          let backgroundColor = "#7B62A3";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "steel": {
          let backgroundColor = "#9EB7B8";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "fire": {
          let backgroundColor = "#ff9347";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "water": {
          let backgroundColor = "#6fbced";
          let textColor = "black";
          return { backgroundColor, textColor };
        }
        case "grass": {
          let backgroundColor = "#9CCD50";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "electric": {
          let backgroundColor = "#ffe752";
          let textColor = "black";
          return { backgroundColor, textColor };
        }
        case "psychic": {
          let backgroundColor = "#F366B9";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "ice": {
          let backgroundColor = "#D7DDF7";
          let textColor = "black";
          return { backgroundColor, textColor };
        }
        case "dragon": {
          let backgroundColor = "#F16E57";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "dark": {
          let backgroundColor = "#707070";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        case "fairy": {
          let backgroundColor = "#FDB9E9";
          let textColor = "black";
          return { backgroundColor, textColor };
        }
        case "unknown": {
          let backgroundColor = "white";
          let textColor = "black";
          return { backgroundColor, textColor };
        }
        case "shadow": {
          let backgroundColor = "#313131";
          let textColor = "white";
          return { backgroundColor, textColor };
        }
        default:
          let backgroundColor = "white";
          let textColor = "black";
          return { backgroundColor, textColor };
      }
    }
  };
  if (size === "large") {
    return <LargeType color={setColors(type)}>{type}</LargeType>;
  } else {
    return <Type color={setColors(type)}>{type}</Type>;
  }
};

export default PokemonType;

const Type = styled.div`
  display: inline-block;
  background: ${({ color }) => color.backgroundColor};
  color: ${({ color }) => color.textColor};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 7px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  width: 40%;
`;

const LargeType = styled(Type)`
  font-size: 20px;
  width: 25%;
  min-width: 100px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
