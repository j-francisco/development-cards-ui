import * as apiUtils from "./apiUtils";
import { setPlayerToken, getPlayerToken, removePlayerToken } from "./tokenUtils";

export const setCurrentGameAction = (gameResponse) => ({
  type: "SET_CURRENT_GAME",
  payload: gameResponse,
});

const createClearGameAction = () => ({
  type: "CLEAR_CURRENT_GAME",
});

const createErrorOnJoinOrCreateAction = (msg) => ({
  type: "JOIN_CREATE_ERROR",
  payload: msg,
});

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
  type: "CLEAR_JOIN_CREATE_ERROR",
});
