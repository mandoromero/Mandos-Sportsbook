// store.js
export const initialState = {
  user: null,
  mlb: {
    games: [],
    error: null,
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_SPORT_GAMES":
      return {
        ...state,
        [action.sport]: { ...state[action.sport], games: action.payload },
      };
    case "SET_SPORT_ERROR":
      return {
        ...state,
        [action.sport]: { ...state[action.sport], error: action.payload },
      };
    default:
      return state;
  }
}
