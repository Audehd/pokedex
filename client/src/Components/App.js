import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import GlobalStyles from "../GlobalStyles";
import Home from "./Home";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";
import UserSignIn from "./UserSignIn";
import UserSignUpPage from "./UserSignUpPage";
import PokemonInfoPage from "./PokemonInfoPage";

import { login } from "../reducers/actions";

const App = () => {
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
      <GlobalStyles />
      <>
        <NavigationBar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/user/signup">
            <UserSignUpPage />
          </Route>
          <Route exact path="/user/signin">
            <UserSignIn />
          </Route>
          <Route exact path="/pokemon/:pokedexNumber">
            <PokemonInfoPage />
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default App;
