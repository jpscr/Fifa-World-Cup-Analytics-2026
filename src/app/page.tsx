
"use client";

import { useEffect, useState } from "react";

import { loadPlayers, Player } from "@/lib/loadPlayers";
import { loadMatchData, MatchPlayer } from "@/lib/loadMatchData";

import GoalsByPosition from "@/components/GoalsByPosition";
import XGScatter from "@/components/XGScatter";
import PlayerExplorer from "@/components/PlayerExplorer";
import TeamGoals from "@/components/TeamGoals";
import TeamAnalysis from "@/components/TeamAnalysis";
import PassAccuracyByPosition from "@/components/PassAccuracyByPosition";
import RatingByPosition from "@/components/RatingByPosition";




export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matchPlayers, setMatchPlayers] = useState<MatchPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayers()
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading player data:", error);
        setLoading(false);
      });

    loadMatchData()
      .then((data) => {
        setMatchPlayers(data);
      })
      .catch((error) => {
        console.error("Error loading match data:", error);
      });
  }, []);

  const totalPlayers = players.length;

  const totalTeams = new Set(
    players.map((player) => player.team)
  ).size;

  const totalGoals = players.reduce(
    (sum, player) => sum + player.goals,
    0
  );

  const totalAssists = players.reduce(
    (sum, player) => sum + player.assists,
    0
  );

  const topScorers = [...players]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 10);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-xl">
          Loading FIFA World Cup analytics...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <div className="flex items-center gap-3">
            <span className="text-4xl">⚽</span>

            <div>
              <h1 className="text-3xl font-bold">
                FIFA World Cup 2026 Analytics
              </h1>

              <p className="text-slate-400 mt-1">
                Player & team performance intelligence
              </p>
            </div>
          </div>

        </div>
      </header>

      <nav className="sticky top-0 z-20 mt-6 mb-8 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          <a
            href="#overview"
            className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            Overview
          </a>

          <a
            href="#players"
            className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            Players
          </a>

          <a
            href="#teams"
            className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            Teams
          </a>

          <a
            href="#performance"
            className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            Performance
          </a>
        </div>
      </nav>


      {/* MAIN CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-8">

      <div id="overview">
        {/* KPI CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm">
              Players
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalPlayers}
            </p>
          </div>


          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm">
              Teams
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalTeams}
            </p>
          </div>


          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm">
              Total Goals
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalGoals}
            </p>
          </div>


          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm">
              Total Assists
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalAssists}
            </p>
          </div>

        </div>


        {/* TOP SCORERS */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

          <div className="p-6 border-b border-slate-800">

            <h2 className="text-xl font-semibold">
              🏆 Top Scorers
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Players ranked by tournament goals
            </p>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-800/50">

                <tr>

                  <th className="text-left px-6 py-4 text-sm text-slate-400">
                    #
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-slate-400">
                    Player
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-slate-400">
                    Team
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-slate-400">
                    Position
                  </th>

                  <th className="text-right px-6 py-4 text-sm text-slate-400">
                    Goals
                  </th>

                  <th className="text-right px-6 py-4 text-sm text-slate-400">
                    Assists
                  </th>

                  <th className="text-right px-6 py-4 text-sm text-slate-400">
                    Rating
                  </th>

                </tr>

              </thead>


              <tbody>

                {topScorers.map((player, index) => (

                  <tr
                    key={player.player_id}
                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                  >

                    <td className="px-6 py-4 text-slate-500">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {player.player_name}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {player.team}
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {player.position}
                    </td>

                    <td className="px-6 py-4 text-right font-semibold">
                      {player.goals}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {player.assists}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {player.avg_rating.toFixed(1)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
        <div className="mt-8">
          <GoalsByPosition players={players} />
        </div>

        <div className="mt-8">
          <XGScatter players={players} />
        </div>

        <div id="players" className="mt-8">
          <PlayerExplorer players={players} />
        </div>

        <div id="teams">          
          <div className="mt-8">
            <TeamGoals players={players} />
          </div>

          <div className="mt-8">
            <TeamAnalysis players={players} />
          </div>
        </div>
        <div id="performance">          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PassAccuracyByPosition players={matchPlayers} />
            <RatingByPosition players={players} />
          </div>

          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Performance Correlation
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Correlation between key player performance metrics
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src="/charts/v4_correlation_heatmap.png"
                alt="Player performance correlation heatmap"
                className="w-full max-w-5xl rounded-lg"
              />
            </div>
          </div>
        </div>        
      </div>            
        {/* FOOTER */}

        <div className="text-center text-slate-500 text-sm mt-10">

          FIFA World Cup 2026 Player Performance Analytics

        </div>

      </section>

    </main>
  );
}