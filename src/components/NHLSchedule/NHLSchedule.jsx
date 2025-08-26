import { useEffect, useState } from "react";
import "./NHLSchedule.css";

const API_KEY = import.meta.env.VITE_ODDS_API_KEY;
const LOADING_TEXT = "Loading NHL preseason schedule...";

export default function NHLSchedule() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGames() {
      try {
        const url = new URL("https://api.the-odds-api.com/v4/sports/icehockey_nhl_preseason/odds");
        url.search = new URLSearchParams({
          regions: "us",
          markets: "h2h",
          oddsFormat: "american",
          apiKey: API_KEY,
        }).toString();

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setGames(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load NHL preseason games.");
      }
    }

    fetchGames();
  }, []);

  return (
    <div className="nhl">
      <h2>NHL PRESEASON</h2>
      <p>Wednesday, September 20</p>

      {error && <p className="error">{error}</p>}
      {!error && !games.length && <p>{LOADING_TEXT}</p>}

      {games.map((game) => {
        const { id, commence_time, home_team, away_team, bookmakers } = game;
        const h2hMarket = (bookmakers[0]?.markets || []).find((m) => m.key === "h2h");
        const outcomes = h2hMarket?.outcomes || [];

        return (
          <div key={id} className="nhl-game">
            <strong>
              {new Date(commence_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </strong>{" "}
            — {away_team} @ {home_team}
            <div className="odds-line">
              {outcomes.map((o) => (
                <span key={o.name}>
                  {o.name}: {o.price > 0 ? `+${o.price}` : o.price}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
