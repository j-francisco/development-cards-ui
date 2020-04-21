import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Start from "./Start";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import AppHeader from "./AppHeader";
import { getPlayerToken } from "../tokenUtils";
import { getGame } from "../actions";
import CurrentGame from "./CurrentGame";

function App() {
  const currentGame = useSelector((state) => state.currentGame);
  console.log("***");
  console.log(currentGame);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentGame = (playerToken) => {
      dispatch(getGame(playerToken));
    };

    const playerToken = getPlayerToken();

    if (playerToken) {
      fetchCurrentGame(playerToken);
    }
  }, [dispatch]);

  return (
    <div>
      <AppHeader />
      <Router>
        <Switch>
          <Route exact path="/">
            {currentGame ? <CurrentGame game={currentGame} /> : <Start />}
          </Route>
          <Route path="/join">
            <JoinGame />
          </Route>
          <Route path="/create">
            <CreateGame />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
