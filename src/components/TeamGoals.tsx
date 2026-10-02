"use client";

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
  team: string;
  goals: number;
}

interface TeamGoalsProps {
  players: Player[];
}

export default function TeamGoals({ players }: TeamGoalsProps) {
  const teamGoals = players.reduce(
    (acc: Record<string, number>, player) => {
      acc[player.team] = (acc[player.team] || 0) + player.goals;
      return acc;
    },
    {}
  );

  const data = Object.entries(teamGoals)
    .map(([team, goals]) => ({
      team,
      goals,
    }))
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 15);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Top Teams by Goals
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Teams ranked by total tournament goals
        </p>
      </div>

      <div className="w-full h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 20, right: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              type="number"
              stroke="#94a3b8"
            />

            <YAxis
              type="category"
              dataKey="team"
              width={80}
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
              dataKey="goals"
              fill="#38bdf8"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}