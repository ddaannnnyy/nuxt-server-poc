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
  async function getCurrentlyPlaying() {
    const url = `${spotifyVariables.apiBase}/me/player`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyVariables.access,
    };
    try {
      const data: CurrentlyPlaying = await $fetch(url, {
        method: "GET",
        headers,
      });
      return data;
    } catch (error: FetchError | unknown) {
      if (error instanceof FetchError) {
        if (error.statusCode == 401) {
          const tokens = await refreshToken();
        } else {
          console.error(error.cause);
          throw createError({
            statusCode: error.statusCode,
            statusMessage: error.statusMessage,
            message: error.message,
          });
        }
      }
    }
  }

  async function getRecentlyPlayed() {
    const url = `${spotifyVariables.apiBase}/me/player/recently-played?limit=10`;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyVariables.access,
    };
    const data: RecentlyPlayed = await $fetch(url, { method: "GET", headers });
    return data;
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

  // await refreshToken();
  const playing = await getCurrentlyPlaying();
  //TODO move this to its own api
  // const recentlyPlayed = await getRecentlyPlayed();

  return {
    currentlyPlaying: playing,
  };
});
