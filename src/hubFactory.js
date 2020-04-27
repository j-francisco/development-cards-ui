import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { getPlayerToken } from "./tokenUtils";
import * as actionTypes from "./actionTypes";

let _connection = null;
let _func = null;

const subscribeToGame = (gameId) => {
  if (_connection.state === HubConnectionState.Connected) {
    const playerToken = getPlayerToken();
    _func(actionTypes.SET_HUB_CONNECTION_STATE, _connection.state);
    _connection.invoke("SubscribeGame", { gameId, playerToken }).catch((err) => {
      console.log("IN SUBSCRIBE GAME ERROR");
      return console.error(err.toString());
    });
  }
};

const startFunc = async (gameId) => {
  _connection = new HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_HUB_URL)
    .withAutomaticReconnect()
    .build();

  _connection.on("Message", (message) => {
    console.log("Message", message);
  });

  _connection.on("ReceiveGame", (gameResponse) => {
    console.log("Received Game", gameResponse);
    _func(actionTypes.SET_CURRENT_GAME, gameResponse);
  });

  _connection.onclose((err) => {
    _func(actionTypes.SET_HUB_CONNECTION_STATE, _connection.state);
    console.log("Hub Connection Closed");
  });

  _connection.onreconnecting((err) => {
    _func(actionTypes.SET_HUB_CONNECTION_STATE, _connection.state);
    console.log("Hub Connection Reconnecting");
  });

  _connection.onreconnected(() => {
    subscribeToGame(gameId);
    _func(actionTypes.SET_HUB_CONNECTION_STATE, _connection.state);
    _func(actionTypes.REFRESH_CURRENT_GAME);
    console.log("Hub Connection Reconnected");
  });

  try {
    await _connection.start();
  } catch (err) {
    console.log("ERROR starting connection");
    console.log(err);
  }

  subscribeToGame(gameId);
};

export const hubFactory = {
  start: startFunc,

  stop: async (gameId) => {
    if (_connection.state === HubConnectionState.Connected) {
      try {
        await _connection.invoke("UnsubscribeGame", { gameId });
      } catch (err) {
        console.log("In UnsubscribeGame error");
        return console.error(err.toString());
      }
    }

    _connection.off("Message");
    _connection.off("ReceiveGame");
    _connection.stop();
  },

  reconnect: async () => {
    if (_connection.state === HubConnectionState.Disconnected) {
      try {
        await startFunc();
      } catch (err) {
        console.log("ERROR reconnecting");
        console.log(err);
      }
    }
  },

  subscribe: (func) => {
    _func = func;
  },
};
