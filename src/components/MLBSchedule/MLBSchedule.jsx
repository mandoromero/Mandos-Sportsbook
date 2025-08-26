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
        const { id, commence_time, home_team, away_team, bookmakers, scores, completed } = game;
        const h2h = (bookmakers?.[0]?.markets || []).find((m) => m.key === "h2h");
        const outcomes = h2h?.outcomes || [];

        const homeScore = scores?.find((s) => s.name === home_team)?.score;
        const awayScore = scores?.find((s) => s.name === away_team)?.score;

        return (
          <div key={id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <strong>
              {new Date(commence_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </strong>{" "}
            — {away_team} @ {home_team}

            {scores && (
              <div style={{ marginTop: "5px", fontWeight: "bold" }}>
                {away_team}: {awayScore} — {home_team}: {homeScore}
                {completed ? " (Final)" : " (Live)"}
              </div>
            )}

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
