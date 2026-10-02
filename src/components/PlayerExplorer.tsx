"use client";

import { useState } from "react";

interface Player {
  player_id: string;
  player_name: string;
  team: string;
  position: string;
  matches: number;
  minutes: number;
  goals: number;
  assists: number;
  shots: number;
  xg: number;
  key_passes: number;
  avg_rating: number;
  goal_contributions: number;
  goals_per90: number;
  gc_per90: number;
}

interface PlayerExplorerProps {
  players: Player[];
}

export default function PlayerExplorer({
  players,
}: PlayerExplorerProps) {
  const [selectedId, setSelectedId] = useState(
    players[0]?.player_id || ""
  );

  const selectedPlayer = players.find(
    (player) => player.player_id === selectedId
  );

  if (!selectedPlayer) {
    return null;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h2 className="text-xl font-semibold">
            Player Explorer
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Explore individual player performance
          </p>
        </div>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-sky-400"
        >
          {players
            .slice()
            .sort((a, b) =>
              a.player_name.localeCompare(b.player_name)
            )
            .map((player) => (
              <option
                key={player.player_id}
                value={player.player_id}
              >
                {player.player_name} — {player.team}
              </option>
            ))}
        </select>

      </div>


      {/* PLAYER INFO */}

      <div className="mb-6">

        <h3 className="text-2xl font-bold">
          {selectedPlayer.player_name}
        </h3>

        <p className="text-slate-400 mt-1">
          {selectedPlayer.team} · {selectedPlayer.position}
        </p>

      </div>


      {/* KPI GRID */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Metric
          label="Goals"
          value={selectedPlayer.goals}
        />

        <Metric
          label="Assists"
          value={selectedPlayer.assists}
        />

        <Metric
          label="Expected Goals"
          value={selectedPlayer.xg.toFixed(2)}
        />

        <Metric
          label="Rating"
          value={selectedPlayer.avg_rating.toFixed(2)}
        />

        <Metric
          label="Goals / 90"
          value={selectedPlayer.goals_per90.toFixed(2)}
        />

        <Metric
          label="Goal Contributions / 90"
          value={selectedPlayer.gc_per90.toFixed(2)}
        />

        <Metric
          label="Shots"
          value={selectedPlayer.shots}
        />

        <Metric
          label="Key Passes"
          value={selectedPlayer.key_passes}
        />

      </div>


      {/* ADDITIONAL INFO */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">

        <Info
          label="Matches"
          value={selectedPlayer.matches}
        />

        <Info
          label="Minutes"
          value={selectedPlayer.minutes}
        />

        <Info
          label="Goal Contributions"
          value={selectedPlayer.goal_contributions}
        />

      </div>

    </div>
  );
}


/* KPI CARD */

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-slate-800/60 rounded-lg p-5">

      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}


/* SECONDARY INFO */

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>

      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="text-lg font-medium mt-1">
        {value}
      </p>

    </div>
  );
}