// useGlobalReducer.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, reducer } from "../store";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const StoreContext = createContext();
const API_KEY = import.meta.env.VITE_SPORTS_GAME_ODDS_KEY; // from .env

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // =========================
  // API: Fetch SportsGameOdds
  // =========================
  async function fetchSportData(leagueID) {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const url = new URL("https://api.sportsgameodds.com/v1/events");
      url.search = new URLSearchParams({
        oddsAvailable: true,
        leagueID,
      }).toString();

      const res = await fetch(url.toString(), {
        headers: { "x-api-key": API_KEY },
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json(); // array of events
    } catch (err) {
      console.error(`Error fetching ${leagueID}:`, err);
      dispatch({
        type: "SET_SPORT_ERROR",
        sport: leagueID.toLowerCase(), // normalize for reducer
        payload: "Failed to load games.",
      });
      return [];
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function loadSport(leagueID) {
    const events = await fetchSportData(leagueID);
    dispatch({
      type: "SET_SPORT_GAMES",
      sport: leagueID.toLowerCase(),
      payload: events,
    });
  }

  // =========================
  // AUTH
  // =========================
  async function registerUser(email, password) {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), { email });
      dispatch({ type: "SET_USER", payload: cred.user });
    } catch (err) {
      dispatch({ type: "SET_AUTH_ERROR", payload: err.message });
    }
  }

  async function loginUser(email, password) {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const cred = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "SET_USER", payload: cred.user });
    } catch (err) {
      dispatch({ type: "SET_AUTH_ERROR", payload: err.message });
    }
  }

  async function logoutUser() {
    await signOut(auth);
    dispatch({ type: "SET_USER", payload: null });
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_USER", payload: user || null });
    });
    return () => unsub();
  }, []);

  // =========================
  // INIT LOAD: Pre-fetch sports
  // =========================
  useEffect(() => {
    ["MLB", "NFL", "NHL", "NBA"].forEach(loadSport);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        loadSport,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// Hook for components
export function useStore() {
  return useContext(StoreContext);
}

export default function useGlobalReducer() {
  const { state, dispatch, ...actions } = useStore();
  return { state, dispatch, ...actions };
}
