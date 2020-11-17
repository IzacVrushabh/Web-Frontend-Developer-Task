import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Pokemon from "./Pokemon";
import Pokemon_Detail from "./Pokemon_Detail";

const App = () => {
  //implement navbar
  //implement Login/logout system using passportjs
  //add some additional logic..
  //need authentication..passport js
  //responsive UI
  return (
    <>
      <BrowserRouter>
        <Switch>
          <>
            <div className="container-fluid my-2 mx-1">
              {/* add other routes  */}
              <Route exact path="/" component={Pokemon} />
              <Route exact path="/about" component={Pokemon} />
              <Route exact path="/pokemons" component={Pokemon} />
              <Route exact path="/:pokemon_id" component={Pokemon_Detail} />
            </div>
          </>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
