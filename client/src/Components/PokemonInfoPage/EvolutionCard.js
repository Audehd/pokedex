import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { setBackgroundColor } from "../../UtilityFunctions";

const EvolutionCard = ({ evolutionChainLink, color }) => {
  //States for the names of pokemons at each stage of evolution
  const [firstStage, setFirstStage] = useState();
  const [secondStage, setSecondStage] = useState();
  const [thirdStage, setThirdStage] = useState();
  //Loading state
  const [loading, setLoading] = useState(true);

  const [firstStageInfo, setFirstStageInfo] = useState();
  const [secondStageInfo, setSecondStageInfo] = useState();
  const [thirdStageInfo, setThirdStageInfo] = useState();

  //function to get evolution chain information
  const fetchEvolutionChainById = () => {
    const id = evolutionChainLink.slice(42, -1);
    fetch(`/evolutionchain/${id}`)
      .then((res) => res.json())
      .then((res) => {
        //this contains first stage evolution, returns a string
        const first = res.data.chain.species.name;
        //console.log("FIRST STAGE", first);
        setFirstStage(first);
        //this contains second stage evolution, returns an array of strings (pokemon names)
        const second = res.data.chain.evolves_to.map(
          (each) => each.species.name
        );
        //console.log("SECOND STAGE", second);
        setSecondStage(second);
        //this contains third stage evolution, returns a string
        const third = res.data.chain.evolves_to[0]?.evolves_to[0]?.species.name;
        //console.log("THIRD STAGE", third);
        setThirdStage(third);
      });
  };

  //Fetch several Pokemons by name, the endpoint accepts an array of pokemon names or Ids
  const getPokemonsByName = (secondStage, callback) => {
    fetch("/pokemons/pokemon/name", {
      method: "POST",
      body: JSON.stringify(secondStage),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        callback(res.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  //fetch one pokemon by name
  const getPokemonByName = (pokemonName, callback) => {
    fetch(`/pokemon/pokedexnumber/${pokemonName}`)
      .then((res) => res.json())
      .then((res) => {
        callback(res.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchEvolutionChainById();
  }, [evolutionChainLink]);

  useEffect(() => {
    if (firstStage) {
      getPokemonByName(firstStage, setFirstStageInfo);
    }
    if (secondStage) {
      getPokemonsByName(secondStage, setSecondStageInfo);
    }
    if (thirdStage) {
      getPokemonByName(thirdStage, setThirdStageInfo);
    }
    setLoading(false);
  }, [firstStage, secondStage, thirdStage]);

  if (
    firstStageInfo &&
    secondStageInfo &&
    thirdStageInfo &&
    loading === false
  ) {
    return (
      <Wrapper bgColor={setBackgroundColor(color)}>
        <FirstStageWrapper>
          <Image
            src={firstStageInfo.sprites.other["official-artwork"].front_default}
          />
          <Name>{firstStage}</Name>
          <Number> #{thirdStageInfo.id}</Number>
        </FirstStageWrapper>
        <SecondStageWrapper>
          {secondStageInfo.map((pokemon) => {
            return (
              <>
                <Image
                  src={pokemon.sprites.other["official-artwork"].front_default}
                />
                <Name key={pokemon.species.name}>{pokemon.species.name}</Name>
                <Number> #{pokemon.id}</Number>
              </>
            );
          })}
        </SecondStageWrapper>
        <ThirdStageWrapper>
          <Image
            src={thirdStageInfo.sprites.other["official-artwork"].front_default}
          />
          <Name>{thirdStage}</Name>
          <Number> #{thirdStageInfo.id}</Number>
        </ThirdStageWrapper>
      </Wrapper>
    );
  } else {
    return <div>... Loading</div>;
  }
};

export default EvolutionCard;

const Wrapper = styled.div`
  //Set the background color using props, from the setBackgroundColor function
  background: ${({ bgColor }) => bgColor.secondaryColor};
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 225px;
  height: auto;
`;

const Name = styled.span`
  margin: 10px 0 0 0;
  font-size: 26px;
  font-weight: 500;
`;

const Number = styled.span`
  margin: 5px 0 0 0;
  font-size: 22px;
  font-weight: 500;
  color: gray;
`;

const FirstStageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondStageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThirdStageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
