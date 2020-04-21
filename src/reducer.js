const initialState = {
  currentGame: null,
  joinCreateError: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_GAME":
      return {
        ...state,
        currentGame: action.payload,
        joinCreateError: null,
      };
    case "CLEAR_CURRENT_GAME":
      return {
        ...state,
        currentGame: null,
      };
    case "JOIN_CREATE_ERROR":
      return {
        ...state,
        currentGame: null,
        joinCreateError: action.payload,
      };
    case "CLEAR_JOIN_CREATE_ERROR":
      return {
        ...state,
        joinCreateError: null,
      };
    default:
      return state;
  }
}
