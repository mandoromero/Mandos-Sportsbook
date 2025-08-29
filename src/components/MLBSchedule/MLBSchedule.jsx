// src/components/MLB/MLBSchedule.jsx
import { useEffect, useState } from "react";
import "./MLBSchedule.css";

export default function MLBSchedule() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMLBGames = async () => {
      try {
        // ✅ call your backend instead of RapidAPI directly
        const res = await fetch("http://localhost:5000/api/mlb");

        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();

        setGames(data.advantages || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching MLB games:", err);
        setError("Failed to load MLB games.");
      }
    };

    fetchMLBGames();
  }, []);

  return (
    <div className="mlb">
      <h2>MLB Schedule</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && !games.length && <p>Loading MLB games...</p>}

      {games.map((adv, idx) => {
        const event = adv.market?.event;
        const outcomes = adv.outcomes || [];

        return (
          <div key={idx} className="mlb-game">
            <strong>{event?.name || "Unknown Event"}</strong>
            <div>
              Start:{" "}
              {event?.startTime
                ? new Date(event.startTime).toLocaleString()
                : "TBD"}
            </div>
            <div>
              {outcomes.map((o, i) => (
                <span key={i} style={{ marginRight: "15px" }}>
                  {o.participant?.name || "Team"} — {o.payout || 0}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
