// src/components/MLBTeams/MLBTeams.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MLBSchedule.css";;

const MLBTeams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("https://api.sportsgameodds.com/v2/teams", {
          params: { leagueID: "MLB" },
          headers: {
            "x-api-key": import.meta.env.VITE_SPORTS_API_KEY, // Make sure you set this in .env
          },
        });

        if (response.data.success) {
          setTeams(response.data.data);
        } else {
          setError("Failed to fetch teams");
        }
      } catch (err) {
        setError(err.message || "Error fetching teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <p>Loading MLB Teams...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="mlb">
      <h2>MLB Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.teamID}>
            <strong>{team.names.long}</strong> ({team.names.short}) - {team.leagueID}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MLBTeams;
