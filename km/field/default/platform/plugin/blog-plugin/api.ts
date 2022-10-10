import { RawgResponse } from "./types.ts";

declare const RAWG_API_KEY: string;

// function that calls the rawg api to search for games
export async function searchGames(
  query: string,
  datesFilter?: string
): Promise<RawgResponse[]> {
  console.log("Trying to find " + query + " for date " + datesFilter);
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${query}${
      datesFilter ? `&dates=${datesFilter}` : ""
    }`
  ).then((response) => response.json());
  return response.results;
}

// function that calls the rawg api to get details about a game
export async function getGameDetails(id: string) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`
  ).then((response) => response.json());
  return response.results;
}
