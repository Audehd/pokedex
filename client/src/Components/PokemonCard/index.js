import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PokemonCard = ({ name, pokedexNumber, imgSrc, types }) => {
  //state for aditional Pokemon information about the pokemeon
  const [pokemonInfo, setPokemonInfo] = useState();

  //Fetch Pokemon by species - to get aditional information about the pokemon
  const getPokemonSpeciesByName = () => {
    fetch(`/pokemons/species/${name}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemonInfo(res.data);
      });
  };

  useEffect(() => {
    getPokemonSpeciesByName();
  }, []);

  //console.log("pokemon info", pokemonInfo);

  //This functions takes the pokemon main color as parameter and determines the background color and secondary color for the pokemon card
  const setBackgroundColor = (color) => {
    if (color) {
      switch (color) {
        case "black": {
          let backgroundColor = "#666666";
          let secondaryColor = "#808080";
          return { backgroundColor, secondaryColor };
        }
        case "blue": {
          //let backgroundColor = "#B5D4E9";
          //let secondaryColor = "#B7DCF4";
          let backgroundColor = "#B3E0FF"; //#97e1fc
          let secondaryColor = "#C8E8FF"; //AEE8FE
          return { backgroundColor, secondaryColor };
        }
        case "brown": {
          let backgroundColor = "#F0C3A3";
          let secondaryColor = "#F6D3AF";
          return { backgroundColor, secondaryColor };
        }
        case "gray": {
          let backgroundColor = "#9ba2a8";
          let secondaryColor = "#B5BDC4";
          return { backgroundColor, secondaryColor };
        }
        case "green": {
          let backgroundColor = "#B4E4C9";
          let secondaryColor = "#B5EFCE";
          return { backgroundColor, secondaryColor };
        }
        case "pink": {
          let backgroundColor = "#F8B2BC";
          let secondaryColor = "#FBDEDE";
          return { backgroundColor, secondaryColor };
        }
        case "purple": {
          let backgroundColor = "#DBBDE5";
          let secondaryColor = "#DDC6E7";
          return { backgroundColor, secondaryColor };
        }
        case "red": {
          let backgroundColor = "#FFABAB";
          let secondaryColor = "#FFBEBC";
          return { backgroundColor, secondaryColor };
        }
        case "white": {
          let backgroundColor = "#E8EAEC";
          let secondaryColor = "#F7F7F7";
          return { backgroundColor, secondaryColor };
        }
        case "yellow": {
          let backgroundColor = "#FBEBA5";
          let secondaryColor = "#FEF3D5";
          return { backgroundColor, secondaryColor };
        }
        default:
          let backgroundColor = pokemonInfo.color.name;
          let secondaryColor = "white";
          return { backgroundColor, secondaryColor };
      }
    }
  };

  if (pokemonInfo) {
    return (
      <Wrapper
        bgColor={setBackgroundColor(pokemonInfo.color.name)}
        // style={{ background: setBackgroundColor() }}
      >
        <ImageWrapper bgColor={setBackgroundColor(pokemonInfo.color.name)}>
          <Image src={imgSrc} alt={`${name}`} />
        </ImageWrapper>
        <Title>{name}</Title>
        <Number># {pokedexNumber}</Number>
        {types.map((type) => {
          return <Type>{type.type.name}</Type>;
        })}
      </Wrapper>
    );
  } else {
    return <div>...loading</div>;
  }
};

export default PokemonCard;

const Wrapper = styled.div`
  padding: 16px;
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.backgroundColor};
  box-shadow: 3px 2.8px 2.2px rgba(0, 0, 0, 0.07),
    3px 6.7px 5.3px rgba(0, 0, 0, 0.05), 3px 12.5px 10px rgba(0, 0, 0, 0.042),
    3px 22.3px 17.9px rgba(0, 0, 0, 0.035),
    3px 41.8px 33.4px rgba(0, 0, 0, 0.028), 3px 100px 80px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  text-align: center;
`;

const ImageWrapper = styled.div`
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.secondaryColor};
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 12px;
  margin-top: 8px;
  font-size: 22px;
  font-weight: 600;
`;

const Number = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  margin-top: 4px;
  font-size: 16px;
  font-weight: 600;
`;

const Type = styled.div`
  display: inline-block;
  background-color: #744fff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  margin: 0 7px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  width: 40%;
`;

{
  /* <Button onClick={() => dispatch(addItem({ id, title, price }))}>
Add to team
</Button> */
}
