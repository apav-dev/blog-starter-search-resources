import { searchGames } from "./api.ts";
import { favorites } from "./favorites.ts";

export async function videoGamesSource(inputString: string): Promise<string> {
  const inputJson = JSON.parse(inputString);
  let pageToken = inputJson["pageToken"];

  if (!pageToken) {
    pageToken = 0;
  } else {
    pageToken = parseInt(pageToken);
  }

  console.log("pageToken", pageToken);
  console.log("favorites length", favorites.length);
  const nextPageToken =
    pageToken >= favorites.length - 1 ? null : pageToken + 1;

  const favorite = favorites[pageToken];

  const games = await searchGames(favorite.name, getDatesFilter(favorite.year));

  const game = games[0];
  console.log("game details returning for: ", game.name);

  // if (games[0].name.toLowerCase() === favorite.name.toLowerCase()) {
  const photoGallery = games[0].short_screenshots.map(
    (screenshot) => screenshot.image
  );
  photoGallery.push(games[0].background_image);
  const data = {
    id: games[0].id,
    name: games[0].name,
    platform: favorite.platform,
    releaseDate: games[0].released,
    genres: games[0].genres.map((genre) => genre.name),
    photoGallery,
  };

  return JSON.stringify({
    data: data,
    nextPageToken,
  });
  // } else {
  //   console.log("Game not found");
  //   return JSON.stringify({
  //     data: {},
  //     nextPageToken,
  //   });
  // }
}

export const getDatesFilter = (year: string): string => {
  return `${year}-01-01,${year}-12-31`;
};
