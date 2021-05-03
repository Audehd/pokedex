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
import PokemonTeamPage from "./PokemonTeamPage";
import UserProfile from "./UserProfile";

const App = () => {
  //State for the pokemon search results, passed down to Sidebar and Home as props.
  const [pokemonSearchResult, setPokemonSearchResult] = useState([]);
  //
  const [loading, setLoading] = useState(true);
  //
  const [getRandom, setGetRandom] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (email) {
      fetch(`/users/user/${email}`, {
        method: "GET",
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
            loading={loading}
            setLoading={setLoading}
            getRandom={getRandom}
            setGetRandom={setGetRandom}
          />
        </SidebarWrapper>
        <MainWrapper>
          <Switch>
            <Route exact path="/">
              <Home
                pokemonSearchResult={pokemonSearchResult}
                setPokemonSearchResult={setPokemonSearchResult}
                loading={loading}
                setLoading={setLoading}
                getRandom={getRandom}
                setGetRandom={setGetRandom}
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
            <Route exact path="/myteams">
              <PokemonTeamPage />
            </Route>
            <Route exact path="/users/:username">
              <UserProfile />
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
    "sidebar header"
    "sidebar main";
  grid-template-columns: 400px 1fr;
  grid-template-rows: 150px 1fr;
`;

const HeaderWrapper = styled.header`
  grid-area: header;
`;

const SidebarWrapper = styled.div`
  grid-area: sidebar;
`;

const MainWrapper = styled.main`
  grid-area: main;
`;
