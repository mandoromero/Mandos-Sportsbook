import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, reducer } from "../store";

const StoreContext = createContext();

const API_KEY = import.meta.env.VITE_ODDS_API_KEY;

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Generic fetch function for any sport
  async function fetchSportData(sportKey, type = "odds") {
    try {
      const url = new URL(`https://api.the-odds-api.com/v4/sports/${sportKey}/${type}`);
      url.search = new URLSearchParams({
        regions: "us",
        markets: "h2h",
        oddsFormat: "american",
        apiKey: API_KEY,
        ...(type === "scores" && { daysFrom: 1 }),
      }).toString();

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`Error fetching ${sportKey} ${type}:`, err);
      dispatch({ type: "SET_SPORT_ERROR", sport: sportKey, payload: "Failed to load games." });
      return [];
    }
  }

  // Initialize with odds + then poll scores
  async function loadSport(sportKey) {
    const odds = await fetchSportData(sportKey, "odds");
    const today = new Date().toISOString().split("T")[0];
    const todaysGames = odds.filter((game) =>
      game.commence_time.startsWith(today)
    );

    dispatch({ type: "SET_SPORT_GAMES", sport: sportKey, payload: todaysGames });

    async function updateScores() {
      const scores = await fetchSportData(sportKey, "scores");
      dispatch({
        type: "SET_SPORT_GAMES",
        sport: sportKey,
        payload: todaysGames.map((g) => {
          const scoreInfo = scores.find((s) => s.id === g.id);
          return scoreInfo ? { ...g, ...scoreInfo } : g;
        }),
      });
    }

    updateScores();
    setInterval(updateScores, 30000); // poll every 30s
  }

  // Load all sports once
  useEffect(() => {
    loadSport("baseball_mlb");
    loadSport("americanfootball_nfl");
    loadSport("basketball_nba");
    loadSport("icehockey_nhl");
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