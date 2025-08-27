import { useEffect, useState } from "react";
import "./NBASchedule.css";

const API_KEY = import.meta.env.VITE_SPORTS_GAME_ODDS_KEY;
const LOADING_TEXT = "Loading NBA preseason schedule...";

export default function NBASchedule() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGames() {
      try {
        const url = new URL("https://api.sportsgameodds.com/v1/events");
        url.search = new URLSearchParams({
          leagueID: "NBA-PRESEASON", // MLB identifier in SportsGameOdds
          oddsAvailable: true,
        }).toString();

        const res = await fetch(url.toString(), {
          headers: { "x-api-key": API_KEY },
        });

        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setGames(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load NBA preseason games.");
      }
    }

    fetchGames();
  }, []);

  return (
    <div className="nba">
      <h2>NBA PRESEASON</h2>
      <p>Thursday, October 2, 2005</p>

      {error && <p className="error">{error}</p>}
      {!error && !games.length && <p>{LOADING_TEXT}</p>}

      {games.map((game) => {
        const { gameID, startTime, homeTeam, awayTeam, odds } = game;

        return (
          <div key={gameID} className="nba-game">
            <strong>
              {new Date(startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </strong>{" "}
            {awayTeam} @ {homeTeam}
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
