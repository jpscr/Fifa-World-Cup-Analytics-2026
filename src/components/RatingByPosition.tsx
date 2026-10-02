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
  avg_rating: number;
}

interface RatingByPositionProps {
  players: Player[];
}

export default function RatingByPosition({
  players,
}: RatingByPositionProps) {
  const positionRatings: Record<
    string,
    { total: number; count: number }
  > = {};

  players.forEach((player) => {
    if (!positionRatings[player.position]) {
      positionRatings[player.position] = {
        total: 0,
        count: 0,
      };
    }

    positionRatings[player.position].total +=
      player.avg_rating;

    positionRatings[player.position].count += 1;
  });

  const data = Object.entries(positionRatings).map(
    ([position, values]) => ({
      position,
      rating: Number(
        (values.total / values.count).toFixed(2)
      ),
    })
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Average Rating by Position
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Average player rating across positions
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
              domain={["auto", "auto"]}
            />

            <Tooltip
              formatter={(value) => [
                Number(value).toFixed(2),
                "Average Rating",
              ]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />

            <Bar
              dataKey="rating"
              fill="#38bdf8"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}