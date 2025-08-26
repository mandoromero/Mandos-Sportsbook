import { useEffect, useState } from "react";
import "../NFLSchedule/NFLSchedule.css";

const LOADING_TEXT = "Loading preseason NFL schedule...";
const API_KEY = import.meta.env.VITE_ODDS_API_KEY;

export default function NFLSchedule() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [timeframeTitle, setTimeframeTitle] = useState("");
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    async function fetchPreseason() {
      try {
        const url = new URL("https://api.the-odds-api.com/v4/sports/americanfootball_nfl_preseason/odds");
        url.search = new URLSearchParams({
          regions: "us",
          markets: "h2h",
          oddsFormat: "american",
          apiKey: API_KEY,
        }).toString();

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();

        // The API returns games; here, we assume they are all Week 3 preseason.
        // Hardcode headers accordingly.
        setTimeframeTitle("PRESEASON WEEK 3");

        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // assume 1-week preseason period
        setDateRange(`${startDate.toLocaleDateString()} – ${endDate.toLocaleDateString()}`);

        setGames(data);
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
        const h2h = (bookmakers[0]?.markets || []).find((m) => m.key === "h2h");
        const outcomes = h2h?.outcomes || [];

        return (
          <div
            key={id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              marginBottom: "10px",
            }}
          >
            <strong>
              {new Date(commence_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </strong>{" "}
            — {away_team} @ {home_team}
            <div style={{ marginTop: "5px" }}>
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
