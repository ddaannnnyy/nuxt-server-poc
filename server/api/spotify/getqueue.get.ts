import type { SpotifyCredentialResponse, SpotifyQueue } from "~~/types";
import { FetchError, FetchResponse } from "ofetch";

// Default Spotify Token Values
const spotifyVariables = {
  access: useRuntimeConfig().spotify.accessToken,
  refresh: useRuntimeConfig().spotify.refreshToken,
  auth: useRuntimeConfig().spotify.authToken,
  apiBase: useRuntimeConfig().spotify.apiBase,
  accountURL: useRuntimeConfig().spotify.accountBase,
};

export default defineEventHandler(async (event) => {
  async function getQueue() {
    const url = `${spotifyVariables.apiBase}/me/player/queue`;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyVariables.access,
    };
    try {
      const data: FetchResponse<SpotifyQueue> = await $fetch(url, {
        method: "GET",
        headers,
      });
      return data._data?.queue;
    } catch (error: FetchError | unknown) {
      if (error instanceof FetchError) {
        if (error.statusCode === 401) {
          console.warn("Spotify Credentials are invalid");
          const tokens: void = await refreshToken();
        } else {
          throw createError({
            statusCode: error.statusCode,
            statusMessage: error.statusMessage,
            cause: error.cause,
            message: error.message,
          });
        }
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
          message: "Unable to fetch Queue",
          cause: `getQueue error is not type of FetchError, and so cannot be parsed. Dumping error\r\n---\r\n${error}`,
        });
      }
    }
  }

  /**
   * Uses stored refresh token to renew the Spotify access token
   *
   * Tokens last 3600s (1 hour)
   */
  async function refreshToken() {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${spotifyVariables.auth}`,
    };
    // TODO this can probably be put into the $fetch directly
    const request = new URLSearchParams();
    request.append("grant_type", "refresh_token");
    request.append("refresh_token", spotifyVariables.refresh);

    try {
      const data: FetchResponse<SpotifyCredentialResponse> = await $fetch(
        spotifyVariables.accountURL,
        {
          method: "POST",
          body: request,
          headers,
        }
      );

      if (data._data && data._data.access_token) {
        spotifyVariables.access = data._data.access_token;
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
          message: "Unable to fetch Queue",
          cause: `getQueue/refreshToken error is not type of FetchError, and so cannot be parsed. Dumping error\r\n---\r\naccess_token does not exist on data response`,
        });
      }
    } catch (error: FetchError | unknown) {
      if (error instanceof FetchError) {
        throw createError({
          statusCode: error.statusCode,
          statusMessage: error.statusMessage,
          message: error.message,
          cause: error.cause,
        });
      } else {
        console.error(error);
        throw createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
          message: "Unable to fetch Queue",
          cause: `getQueue/refreshToken error is not type of FetchError, and so cannot be parsed. Dumping error\r\n---\r\n${error}`,
        });
      }
    }
  }

  // API runs from here
  const queue = await getQueue();

  return {
    queue: queue,
  };
});
