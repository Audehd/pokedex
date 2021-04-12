import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import Home from "./Home";

import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";
import UserSignIn from "./UserSignIn";
import UserSignUpPage from "./UserSignUpPage";

const App = () => {
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
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default App;
