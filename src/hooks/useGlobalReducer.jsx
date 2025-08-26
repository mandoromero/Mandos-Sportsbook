// useGlobalReducer.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, reducer } from "../store";

const StoreContext = createContext();
const API_KEY = import.meta.env.VITE_SPORTS_GAME_ODDS_KEY; // 👈 Add this in your .env

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Generic fetch for SportsGameOdds
  async function fetchSportData(leagueID) {
    try {
      const url = new URL("https://api.sportsgameodds.com/v1/events");
      url.search = new URLSearchParams({
        oddsAvailable: true,
        leagueID: leagueID,
      }).toString();

      const res = await fetch(url.toString(), {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json(); // array of games
    } catch (err) {
      console.error(`Error fetching ${leagueID}:`, err);
      dispatch({
        type: "SET_SPORT_ERROR",
        sport: leagueID,
        payload: "Failed to load games.",
      });
      return [];
    }
  }

  async function loadSport(leagueID) {
    const events = await fetchSportData(leagueID);
    dispatch({ type: "SET_SPORT_GAMES", sport: leagueID, payload: events });
  }

  useEffect(() => {
    loadSport("MLB"); // 👈 just MLB for now
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

export default function useGlobalReducer() {
  const { state, dispatch } = useStore();
  return { state, dispatch };
}
