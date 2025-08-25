import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_ODDS_API_KEY;

export default function MLBSchedule() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGames() {
      try {
        const url = new URL("https://api.the-odds-api.com/v4/sports/baseball_mlb/odds");
        url.search = new URLSearchParams({
          regions: "us", // ✅ must be plural
          markets: "h2h",
          oddsFormat: "american",
          apiKey: API_KEY,
        }).toString();

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();

        // ✅ filter to today’s games
        const today = new Date().toISOString().split("T")[0];
        const todaysGames = data.filter((game) =>
          game.commence_time.startsWith(today)
        );

        setGames(todaysGames);
        setError(""); // clear any previous errors
      } catch (err) {
        console.error(err);
        setError("Failed to load today's MLB games.");
      }
    }

    fetchGames();
  }, [API_KEY]);

  return (
    <div className="mlb">
      <h2>Today's MLB Games</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && !games.length && <p>No MLB games scheduled for today.</p>}

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
