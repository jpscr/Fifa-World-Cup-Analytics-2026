"use client";

import { useMemo, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Player {
  player_id: string;
  player_name: string;
  team: string;
  position: string;
  matches: number;
  minutes: number;
  goals: number;
  assists: number;
  xg: number;
  avg_rating: number;
}

interface TeamAnalysisProps {
  players: Player[];
}

export default function TeamAnalysis({
  players,
}: TeamAnalysisProps) {
  const teams = useMemo(
    () =>
      Array.from(new Set(players.map((player) => player.team))).sort(),
    [players]
  );

  const [selectedTeam, setSelectedTeam] = useState(
    teams[0] || ""
  );

  const teamPlayers = players.filter(
    (player) => player.team === selectedTeam
  );

  const totalGoals = teamPlayers.reduce(
    (sum, player) => sum + player.goals,
    0
  );

  const totalAssists = teamPlayers.reduce(
    (sum, player) => sum + player.assists,
    0
  );

  const totalXG = teamPlayers.reduce(
    (sum, player) => sum + player.xg,
    0
  );

  const avgRating =
    teamPlayers.length > 0
      ? teamPlayers.reduce(
          (sum, player) => sum + player.avg_rating,
          0
        ) / teamPlayers.length
      : 0;

  const chartData = [
    {
      metric: "Goals",
      value: totalGoals,
    },
    {
      metric: "xG",
      value: Number(totalXG.toFixed(2)),
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold">
            Team Analysis
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Explore team-level attacking and performance metrics
          </p>
        </div>

        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-sky-400"
        >
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-2xl font-bold mb-6">
        {selectedTeam}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Metric label="Goals" value={totalGoals} />
        <Metric label="Assists" value={totalAssists} />
        <Metric label="Expected Goals" value={totalXG.toFixed(2)} />
        <Metric label="Average Rating" value={avgRating.toFixed(2)} />
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="metric"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />

            <Bar
              dataKey="value"
              fill="#38bdf8"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

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