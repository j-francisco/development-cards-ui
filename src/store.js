import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { hubFactory } from "./hubFactory";
import * as actionTypes from "./actionTypes";
import { getGame } from "./actions";
import { getPlayerToken } from "./tokenUtils";

const hubFactoryMiddleware = (store) => {
  return (next) => async (action) => {
    switch (action.type) {
      case actionTypes.START_HUB_CONNECTION:
        await hubFactory.start(action.payload);
        break;
      case actionTypes.STOP_HUB_CONNECTION:
        await hubFactory.stop(action.payload);
        break;
      case actionTypes.RESTART_HUB_CONNECTION:
        await hubFactory.reconnect();
        break;
      default:
        return next(action);
    }
  };
};

const middleware = applyMiddleware(thunk, hubFactoryMiddleware);

const store = createStore(reducer, composeWithDevTools(middleware));

hubFactory.subscribe((type, payload) => {
  switch (type) {
    case actionTypes.REFRESH_CURRENT_GAME:
      const playerToken = getPlayerToken();
      store.dispatch(getGame(playerToken));
      break;
    default:
      store.dispatch({ type, payload });
  }
});

export default store;
