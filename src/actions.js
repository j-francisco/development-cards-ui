import * as apiUtils from "./apiUtils";
import { setPlayerToken, getPlayerToken, removePlayerToken } from "./tokenUtils";
import * as actionTypes from "./actionTypes";

export const setCurrentGameAction = (gameResponse) => ({
  type: actionTypes.SET_CURRENT_GAME,
  payload: gameResponse,
});

const createClearGameAction = () => ({
  type: actionTypes.CLEAR_CURRENT_GAME,
});

const createErrorOnJoinOrCreateAction = (msg) => ({
  type: actionTypes.JOIN_CREATE_ERROR,
  payload: msg,
});

export const connectHubAction = (gameId) => ({
  type: actionTypes.START_HUB_CONNECTION,
  payload: gameId,
});

export const disconnectHubAction = (gameId) => ({
  type: actionTypes.STOP_HUB_CONNECTION,
  payload: gameId,
});

export const reconnectHubAction = (gameId) => ({ type: actionTypes.RESTART_HUB_CONNECTION });

const setPlayerTokenFromResponse = (response) => {
  setPlayerToken(response.headers["x-currentplayertoken"]);
};

export const createGame = (playerName, history) => {
  return async (dispatch) => {
    try {
      const response = await apiUtils.post("game", { playerName });

      setPlayerTokenFromResponse(response);

      history.push("/");

      return dispatch(setCurrentGameAction(response.data));
    } catch (error) {
      removePlayerToken();
      dispatch(createErrorOnJoinOrCreateAction("Failed to create game, try again."));
    }
  };
};

export const getGame = (playerToken) => {
  return async (dispatch) => {
    try {
      const response = await apiUtils.get("game", playerToken);
      return dispatch(setCurrentGameAction(response.data));
    } catch (error) {
      removePlayerToken();
      dispatch(createClearGameAction());
    }
  };
};

export const joinGame = (gameCode, playerName, history) => {
  return async (dispatch) => {
    try {
      const response = await apiUtils.post(`game/${gameCode}/join`, { playerName });

      setPlayerTokenFromResponse(response);

      history.push("/");

      return dispatch(setCurrentGameAction(response.data));
    } catch (error) {
      let errMsg;
      if (error.response) {
        errMsg =
          error.response.status === 404
            ? "No game found with that code."
            : "Failed to join game, try again.";
      } else {
        errMsg = "Unexpected error occurred.";
      }
      removePlayerToken();
      dispatch(createErrorOnJoinOrCreateAction(errMsg));
    }
  };
};

export const leaveGame = (gameCode) => {
  return async (dispatch) => {
    try {
      const playerToken = getPlayerToken();

      await apiUtils.post(`game/${gameCode}/leave`, {}, playerToken);

      removePlayerToken();

      return dispatch(createClearGameAction());
    } catch (error) {
      removePlayerToken();
      dispatch(createClearGameAction());
    }
  };
};

export const endGame = (gameCode) => {
  return async (dispatch) => {
    try {
      const playerToken = getPlayerToken();

      await apiUtils.post(`game/${gameCode}/end`, {}, playerToken);

      removePlayerToken();

      return dispatch(createClearGameAction());
    } catch (error) {
      removePlayerToken();
      dispatch(createClearGameAction());
    }
  };
};

export const pullCard = () => {
  return async (dispatch) => {
    try {
      const playerToken = getPlayerToken();

      const response = await apiUtils.post(`game/pullCard`, {}, playerToken);

      return dispatch(setCurrentGameAction(response.data));
    } catch (error) {
      // show toast message?
    }
  };
};

export const playCard = (gameCardId) => {
  return async (dispatch) => {
    try {
      const playerToken = getPlayerToken();

      const response = await apiUtils.post(`game/playCard`, { gameCardId }, playerToken);

      return dispatch(setCurrentGameAction(response.data));
    } catch (error) {
      // show toast message?
    }
  };
};

export const clearJoinCreateError = () => ({
  type: actionTypes.CLEAR_CURRENT_GAME,
});

export const setConnectionOpen = () => ({
  type: "HUB_CONNECTION_OPEN",
});

export const setConnectionClosed = () => ({
  type: "HUB_CONNECTION_CLOSED",
});
