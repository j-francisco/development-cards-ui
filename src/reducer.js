import * as actionTypes from "./actionTypes";

const initialState = {
  currentGame: null,
  joinCreateError: null,
  hubConnectionState: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_GAME:
      return {
        ...state,
        currentGame: action.payload,
        joinCreateError: null,
      };
    case actionTypes.CLEAR_CURRENT_GAME:
      return {
        ...state,
        currentGame: null,
        hubConnectionState: null,
      };
    case actionTypes.JOIN_CREATE_ERROR:
      return {
        ...state,
        currentGame: null,
        hubConnectionState: null,
        joinCreateError: action.payload,
      };
    case actionTypes.CLEAR_JOIN_CREATE_ERROR:
      return {
        ...state,
        joinCreateError: null,
      };
    case actionTypes.SET_HUB_CONNECTION_STATE:
      return {
        ...state,
        hubConnectionState: action.payload,
      };
    default:
      return state;
  }
}
