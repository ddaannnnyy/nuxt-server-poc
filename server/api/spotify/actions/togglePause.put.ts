import type {
  SpotifyCredentialResponse,
  CurrentlyPlaying,
  RecentlyPlayed,
} from "~~/types";

import { FetchError } from "ofetch";

const spotifyVariables = {
  access: useRuntimeConfig().spotify.accessToken,
  refresh: useRuntimeConfig().spotify.refreshToken,
  auth: useRuntimeConfig().spotify.authToken,
  apiBase: useRuntimeConfig().spotify.apiBase,
  accountURL: useRuntimeConfig().spotify.accountBase,
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const action: "pause" | "play" = body.action;
  async function changeState(action: "pause" | "play") {
    const headers = {
      Authorization: "Bearer " + spotifyVariables.access,
      "Content-Type": "application/json",
    };
    try {
      if (action === "pause") {
        const url = `${spotifyVariables.apiBase}/me/player/pause`;
        const data = $fetch(url, { method: "PUT", headers });
      } else if (action === "play") {
        const url = `${spotifyVariables.apiBase}/me/player/play`;
        const data = $fetch(url, { method: "PUT", headers });
      } else {
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request",
          message: "action in body must be play or pause",
          cause: "Invalid action passed to togglePause/changeState",
        });
      }
    } catch (error: FetchError | unknown) {
      console.error("error", error);
      if (error instanceof FetchError) {
        if (error.statusCode == 401) {
          const tokens = await refreshToken();
          console.log("refreshing tokens");
        } else {
          console.error(error.cause);
          throw createError({
            statusCode: error.statusCode,
            statusMessage: error.statusMessage,
            message: error.message,
            cause: error.cause,
          });
        }
      }
    }
  }

  async function refreshToken() {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${spotifyVariables.auth}`,
    };
    const request = new URLSearchParams();
    request.append("grant_type", "refresh_token");
    request.append("refresh_token", spotifyVariables.refresh);

    try {
      const data: SpotifyCredentialResponse = await $fetch(
        spotifyVariables.accountURL,
        {
          method: "POST",
          body: request,
          headers,
        }
      );

      if (data.access_token) {
        spotifyVariables.access = data.access_token;
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
          message: "Unable to refresh credentials",
        });
      }
    } catch (error: FetchError | unknown) {
      if (error instanceof FetchError) {
        console.error(error.cause);
        throw createError({
          statusCode: error.statusCode,
          statusMessage: error.statusMessage,
          message: error.message,
          cause: error.cause,
        });
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
          message: "Unable to refresh credentials",
        });
      }
    }
  }

  // API runs here
  //   const playing = await getCurrentlyPlaying();
  //TODO move this to its own api
  // const recentlyPlayed = await getRecentlyPlayed();
  await refreshToken();
  const request = changeState(action);
});
