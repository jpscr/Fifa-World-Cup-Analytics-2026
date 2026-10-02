import Papa from "papaparse";

export interface MatchPlayer {
  player_id: string;
  player_name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  expected_goals_xg: number;
  total_passes: number;
  successful_passes: number;
  pass_accuracy: number;
  player_rating: number;
}

export async function loadMatchData(): Promise<MatchPlayer[]> {
  const response = await fetch("/data/match_level_with_kpis.csv");

  if (!response.ok) {
    throw new Error("Failed to load match-level data");
  }

  const csvText = await response.text();

  const result = Papa.parse<MatchPlayer>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  if (result.errors.length > 0) {
    console.error("CSV parsing errors:", result.errors);
  }

  return result.data;
}