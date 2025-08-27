import { useEffect, useState } from "react";
import "./NHLSchedule.css";

const API_KEY = import.meta.env.VITE_SPORTS_GAME_ODDS_KEY; // Your SportsGameOdds key
const LOADING_TEXT = "Loading NHL preseason schedule...";

export default function NHLSchedule() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGames() {
      try {
        const url = new URL("https://api.sportsgameodds.com/v1/events");
        url.search = new URLSearchParams({
          oddsAvailable: true,
          leagueID: "NHL-PRESEASON", // Use the NHL preseason league ID
        }).toString();

        const res = await fetch(url.toString(), {
          headers: { "x-api-key": API_KEY },
        });

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
        const { gameID, startTime, homeTeam, awayTeam, odds, score, completed } = game;

        return (
          <div key={gameID} className="nhl-game">
            <strong>
              {new Date(startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </strong>{" "}
            — {awayTeam} @ {homeTeam}

            {score && (
              <div style={{ marginTop: "5px", fontWeight: "bold" }}>
                {awayTeam}: {score.away} — {homeTeam}: {score.home}
                {completed ? " (Final)" : " (Live)"}
              </div>
            )}

            {odds && (
              <div className="odds-line">
                <span>{awayTeam}: {odds.away > 0 ? `+${odds.away}` : odds.away}</span>
                <span>{homeTeam}: {odds.home > 0 ? `+${odds.home}` : odds.home}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
