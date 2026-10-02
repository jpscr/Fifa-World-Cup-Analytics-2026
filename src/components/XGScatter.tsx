"use client";

import { useMemo, useState } from "react";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Player {
  player_name: string;
  team: string;
  goals: number;
  xg: number;
}

interface XGScatterProps {
  players: Player[];
}

export default function XGScatter({
  players,
}: XGScatterProps) {
  const data = useMemo(
    () =>
      players
        .filter(
          (player) =>
            Number.isFinite(player.goals) &&
            Number.isFinite(player.xg)
        )
        .map((player) => ({
          xg: player.xg,
          goals: player.goals,
          player_name: player.player_name,
          team: player.team,
        })),
    [players]
  );

  const fullDomains = useMemo(() => {
    const maxX =
      Math.max(...data.map((player) => player.xg), 1);

    const maxY =
      Math.max(...data.map((player) => player.goals), 1);

    return {
      x: [0, Math.ceil(maxX * 1.05)] as [number, number],
      y: [0, Math.ceil(maxY * 1.05)] as [number, number],
    };
  }, [data]);

  const [xDomain, setXDomain] = useState<[number, number] | null>(
    null
  );

  const [yDomain, setYDomain] = useState<[number, number] | null>(
    null
  );

  const currentX = xDomain ?? fullDomains.x;
  const currentY = yDomain ?? fullDomains.y;

  const zoom = (factor: number) => {
    const zoomDomain = (
      domain: [number, number]
    ): [number, number] => {
      const [min, max] = domain;

      const center = (min + max) / 2;
      const halfRange = ((max - min) * factor) / 2;

      let newMin = center - halfRange;
      let newMax = center + halfRange;

      newMin = Math.max(0, newMin);

      if (newMax <= newMin) {
        newMax = newMin + 1;
      }

      return [newMin, newMax];
    };

    setXDomain(zoomDomain(currentX));
    setYDomain(zoomDomain(currentY));
  };

  const resetZoom = () => {
    setXDomain(null);
    setYDomain(null);
  };

  const handleWheel = (
    event: React.WheelEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    if (event.deltaY < 0) {
      zoom(0.8);
    } else {
      zoom(1.25);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Expected Goals vs Actual Goals
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Comparing scoring output against expected goals (xG)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => zoom(0.8)}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-400 transition text-lg"
            title="Zoom in"
          >
            +
          </button>

          <button
            type="button"
            onClick={() => zoom(1.25)}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-400 transition text-lg"
            title="Zoom out"
          >
            −
          </button>

          <button
            type="button"
            onClick={resetZoom}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-400 transition text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        className="w-full h-[400px]"
        onWheel={handleWheel}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              type="number"
              dataKey="xg"
              name="Expected Goals"
              stroke="#94a3b8"
              domain={currentX}
              allowDataOverflow
              label={{
                value: "Expected Goals (xG)",
                position: "insideBottom",
                offset: -5,
                fill: "#94a3b8",
              }}
            />

            <YAxis
              type="number"
              dataKey="goals"
              name="Actual Goals"
              stroke="#94a3b8"
              domain={currentY}
              allowDataOverflow
              label={{
                value: "Actual Goals",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
              }}
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#ffffff",
              }}
              formatter={(value, name) => [
                Number(value).toFixed(2),
                name,
              ]}
              labelFormatter={() => ""}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) {
                  return null;
                }

                const player = payload[0].payload;

                return (
                  <div className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
                    <p className="font-semibold text-white">
                      {player.player_name}
                    </p>

                    <p className="text-sm text-slate-400 mb-2">
                      {player.team}
                    </p>

                    <p className="text-sm">
                      xG:{" "}
                      <span className="font-semibold">
                        {player.xg.toFixed(2)}
                      </span>
                    </p>

                    <p className="text-sm">
                      Goals:{" "}
                      <span className="font-semibold">
                        {player.goals}
                      </span>
                    </p>
                  </div>
                );
              }}
            />

            <Scatter
              name="Players"
              data={data}
              fill="#38bdf8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-500 mt-3">
        Use + / − or scroll over the chart to zoom. Reset to
        return to the full view.
      </p>
    </div>
  );
}