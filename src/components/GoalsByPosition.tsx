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
  position: string;
  goals: number;
}

interface GoalsByPositionProps {
  players: Player[];
}

export default function GoalsByPosition({
  players,
}: GoalsByPositionProps) {

  const positionGoals = players.reduce(
    (acc: Record<string, number>, player) => {

      if (!acc[player.position]) {
        acc[player.position] = 0;
      }

      acc[player.position] += player.goals;

      return acc;

    },
    {}
  );

  const data = Object.entries(positionGoals).map(
    ([position, goals]) => ({
      position,
      goals,
    })
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Goals by Position
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Total goals scored by player position
        </p>

      </div>

      <div className="w-full h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="position"
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
              dataKey="goals"
              fill="#38bdf8"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}