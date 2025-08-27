import { useEffect, useState } from "react";
import "./NFLSchedule.css";

const LOADING_TEXT = "Loading preseason NFL schedule...";
const API_KEY = import.meta.env.VITE_ODDS_API_KEY;

export default function NFLSchedule() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [timeframeTitle, setTimeframeTitle] = useState("PRESEASON WEEK 3");
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    async function fetchPreseason() {
      try {
        const url = new URL("https://api.sportsgameodds.com/v1/events");
        url.search = new URLSearchParams({
          leagueID: "N", // MLB identifier in SportsGameOdds
          oddsAvailable: true,
        }).toString();

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();

        setGames(data || []);

        // Example date range (Week 3)
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        setDateRange(`${startDate.toLocaleDateString()} – ${endDate.toLocaleDateString()}`);
      } catch (err) {
        console.error(err);
        setError("Failed to load NFL preseason games.");
      }
    }

    fetchPreseason();
  }, []);

  return (
    <div className="nfl">
      <h2>{timeframeTitle}</h2>
      {dateRange && <p>{dateRange}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && !games.length && <p>{LOADING_TEXT}</p>}

      {games.map((game) => {
        const { id, commence_time, home_team, away_team, bookmakers } = game;
        const h2h = (bookmakers?.[0]?.markets || []).find((m) => m.key === "h2h");
        const outcomes = h2h?.outcomes || [];

        return (
          <div key={id} className="nfl-game">
            <strong>
              {new Date(commence_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </strong>{" "}
            — {away_team} @ {home_team}
            <div className="odds-line">
              {outcomes.map((o) => (
                <span key={o.name} style={{ marginRight: "15px" }}>
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
