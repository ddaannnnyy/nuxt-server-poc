import { FetchError, FetchResponse } from "ofetch";

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export default defineEventHandler(async (event) => {
  const clientID = useRuntimeConfig(event).spotify.clientID;
  const redirectUri = "http://localhost:3000/callback";
  const scope =
    "user-read-playback-state user-read-currently-playing user-read-recently-played user-modify-playback-state";
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  // const codeChallenge = generateRandomString(64);

  const params = {
    response_type: "code",
    client_id: clientID,
    scope,
    code_challenge_method: "S256",
    //   code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  return {
    url: authUrl.toString(),
  };
});
