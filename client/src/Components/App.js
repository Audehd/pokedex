import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import GlobalStyles from "../GlobalStyles";
import Home from "./Home";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";
import UserSignIn from "./UserSignIn";
import UserSignUpPage from "./UserSignUpPage";
import PokemonInfoPage from "./PokemonInfoPage";

import { login } from "../reducers/actions";

const App = () => {
  //State for the pokemon search results, passed down to Sidebar and Home as props.
  const [pokemonSearchResult, setPokemonSearchResult] = useState([]);

  //Fetch several Pokemons by name, the endpoint accepts an array of pokemon names or Ids
  const getPokemonsByName = (pokemonList) => {
    fetch("/pokemons/pokemon/name", {
      method: "POST",
      body: JSON.stringify(pokemonList),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPokemonSearchResult(res.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (email) {
      fetch(`/users/user/${email}`, {
        method: "GET",
        //body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const { status, data, message } = res;
          if (status === 201) {
            const user = data;
            dispatch(login(user));
          } else if (status === 500) {
            console.log("error in fetching user info", message);
          }
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <Wrapper>
        <GlobalStyles />
        <HeaderWrapper>
          <NavigationBar />
        </HeaderWrapper>
        <SidebarWrapper>
          <Sidebar
            pokemonSearchResult={pokemonSearchResult}
            setPokemonSearchResult={setPokemonSearchResult}
          />
        </SidebarWrapper>
        <MainWrapper>
          <Switch>
            <Route exact path="/">
              <Home
                pokemonSearchResult={pokemonSearchResult}
                setPokemonSearchResult={setPokemonSearchResult}
              />
            </Route>
            <Route exact path="/signup">
              <UserSignUpPage />
            </Route>
            <Route exact path="/signin">
              <UserSignIn />
            </Route>
            <Route exact path="/pokemon/:pokedexNumber">
              <PokemonInfoPage />
            </Route>
          </Switch>
        </MainWrapper>
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-areas:
    "sidebar header header header"
    "sidebar main main main";
`;

const HeaderWrapper = styled.header`
  grid-area: header;
  //border-bottom: 3px dashed #ff406e;
`;

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  //border-right: 3px dashed #ff406e;
`;

const MainWrapper = styled.main`
  grid-area: main;
`;
