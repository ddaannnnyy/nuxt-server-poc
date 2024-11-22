import type { SpotifyCredentialResponse, SpotifyQueue } from "~~/types";

export default defineEventHandler(async (event) => {
  const spotifyVariables = {
    access: useRuntimeConfig(event).spotify.accessToken,
    refresh: useRuntimeConfig(event).spotify.refreshToken,
    auth: useRuntimeConfig(event).spotify.authToken,
    apiBase: useRuntimeConfig(event).spotify.apiBase,
    accountURL: useRuntimeConfig(event).spotify.accountBase,
  };
  async function getQueue() {
    const url = `${spotifyVariables.apiBase}/me/player/queue`;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyVariables.access,
    };
    const data: SpotifyQueue = await $fetch(url, { method: "GET", headers });
    return data.queue;
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
    } catch (error) {
      console.error(error);
    }
  }

  await refreshToken();
  const queue = await getQueue();

  return {
    queue: queue,
  };
});
