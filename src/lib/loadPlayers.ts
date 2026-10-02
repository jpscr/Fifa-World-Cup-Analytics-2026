import Papa from "papaparse";

export interface Player {
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

export async function loadPlayers(): Promise<Player[]> {
  const response = await fetch("/data/player_level_summary.csv");

  if (!response.ok) {
    throw new Error("Failed to load player data");
  }

  const csvText = await response.text();

  const result = Papa.parse<Player>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  if (result.errors.length > 0) {
    console.error("CSV parsing errors:", result.errors);
  }

  return result.data;
}