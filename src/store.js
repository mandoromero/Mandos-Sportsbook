// store.js

export const initialState = {
  mlb: { games: [], error: "" },
  nfl: { games: [], error: "" },
  nba: { games: [], error: "" },
  nhl: { games: [], error: "" },
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_SPORT_GAMES":
      return {
        ...state,
        [action.sport]: { ...state[action.sport], games: action.payload, error: "" },
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
