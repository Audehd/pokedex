import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import Home from "./Home";

import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";
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
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default App;
