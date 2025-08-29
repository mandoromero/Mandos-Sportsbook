export const initialState = {
  // ===== AUTH =====
  user: null,
  authError: null,
  loading: false,

  // ===== SPORTS =====
  sports: {
    mlb: { games: [], error: null },
    nfl: { games: [], error: null },
    nhl: { games: [], error: null },
    nba: { games: [], error: null },
  },

  // ===== UI / EXTRA =====
  selectedSport: "mlb", // default view
  selectedGame: null,   // store a single game object when clicked
  favorites: [],        // store list of favorited game IDs or teams
};

export function reducer(state, action) {
  switch (action.type) {
    // ===== SPORTS =====
    case "SET_SPORT_GAMES":
      return {
        ...state,
        sports: {
          ...state.sports,
          [action.sport]: {
            ...state.sports[action.sport],
            games: action.payload,
            error: null,
          },
        },
      };

    case "SET_SPORT_ERROR":
      return {
        ...state,
        sports: {
          ...state.sports,
          [action.sport]: {
            ...state.sports[action.sport],
            error: action.payload,
          },
        },
      };

    // ===== AUTH =====
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        authError: null,
        loading: false,
      };

    case "SET_AUTH_ERROR":
      return {
        ...state,
        authError: action.payload,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    // ===== UI / EXTRA =====
    case "SET_SELECTED_SPORT":
      return { ...state, selectedSport: action.payload };

    case "SET_SELECTED_GAME":
      return { ...state, selectedGame: action.payload };

    case "TOGGLE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter((id) => id !== action.payload) // remove if exists
          : [...state.favorites, action.payload], // add if not
      };

    default:
      return state;
  }
}
