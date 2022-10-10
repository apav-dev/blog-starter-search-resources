import { videoGamesSource } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.133.0/testing/asserts.ts";
import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

declare global {
  var RAWG_API_KEY: string;
}

const envVars = config();

globalThis.RAWG_API_KEY = envVars.RAWG_API_KEY;

// deno test function that calls readYaml
Deno.test("readYaml", async () => {
  const yamlObject = await readYaml();
  assertEquals(1, 2);
});

// deno test function that calls videoGamesSource and parses the response
Deno.test("videoGamesSource", async () => {
  const response = await videoGamesSource("{}");
  let responseJson = JSON.parse(response);
  const responses = [responseJson];
  let nextPageToken = responseJson.nextPageToken;
  // do while loop that calls videoGamesSource until nextPageToken is null
  while (nextPageToken) {
    const response = await videoGamesSource(
      JSON.stringify({ pageToken: nextPageToken })
    );
    const responseJson = JSON.parse(response);
    nextPageToken = responseJson.nextPageToken;
    responses.push(responseJson);
  }
  assertEquals(responses.length, 48);
});
