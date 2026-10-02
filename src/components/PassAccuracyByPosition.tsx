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

interface MatchPlayer {
  position: string;
  total_passes: number;
  successful_passes: number;
}

interface PassAccuracyProps {
  players: MatchPlayer[];
}

export default function PassAccuracyByPosition({
  players,
}: PassAccuracyProps) {
  const positionData: Record<
    string,
    {
      total: number;
      successful: number;
    }
  > = {};

  players.forEach((player) => {
    if (!positionData[player.position]) {
      positionData[player.position] = {
        total: 0,
        successful: 0,
      };
    }

    positionData[player.position].total +=
      player.total_passes || 0;

    positionData[player.position].successful +=
      player.successful_passes || 0;
  });

  const data = Object.entries(positionData).map(
    ([position, values]) => ({
      position,
      accuracy:
        values.total > 0
          ? Number(
              ((values.successful / values.total) * 100).toFixed(2)
            )
          : 0,
    })
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Pass Accuracy by Position
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Passing efficiency across player positions
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
              domain={[0, 100]}
              unit="%"
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(2)}%`,
                "Pass Accuracy",
              ]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />

            <Bar
              dataKey="accuracy"
              fill="#38bdf8"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}