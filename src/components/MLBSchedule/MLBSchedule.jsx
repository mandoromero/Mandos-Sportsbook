import { useStore } from "../../hooks/useGlobalReducer";
import "./MLBSchedule.css";

export default function MLBSchedule() {
  const { state } = useStore();
  const { games, error } = state.mlb;

  return (
    <div className="mlb">
      <h2>Today's MLB Games</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && !games.length && <p>No MLB games scheduled for today.</p>}

      {games.map((game) => {
        const {
          gameID,
          startTime,
          homeTeam,
          awayTeam,
          completed,
          score,
          odds,
        } = game;

        return (
          <div
            key={gameID}
            style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
          >
            <strong>
              {new Date(startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </strong>{" "}
            — {awayTeam} @ {homeTeam}

            {score && (
              <div style={{ marginTop: "5px", fontWeight: "bold" }}>
                {awayTeam}: {score.away} — {homeTeam}: {score.home}
                {completed ? " (Final)" : " (Live)"}
              </div>
            )}

            {odds && (
              <div style={{ marginTop: "5px" }}>
                <span style={{ marginRight: "15px" }}>
                  {awayTeam}: {odds.away > 0 ? `+${odds.away}` : odds.away}
                </span>
                <span>
                  {homeTeam}: {odds.home > 0 ? `+${odds.home}` : odds.home}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
