import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Pokemon from "./Pokemon";
import Pokemon_Detail from "./Pokemon_Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <div className="App">
            <Route exact path="/" component={Pokemon} />
            <Route path="/:pokemon_id" component={Pokemon_Detail} />
          </div>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
