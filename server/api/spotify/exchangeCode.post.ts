import { FetchError, FetchResponse } from "ofetch";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            `${useRuntimeConfig(event).spotify.clientID}:${
              useRuntimeConfig(event).spotify.clientSecret
            }`
          ),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: body.code,
        redirect_uri: "http://localhost:3000/callback",
      }),
    });
    return response;
  } catch (error: FetchError | unknown) {
    if (error instanceof FetchError) {
      console.error("error hit");
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
        message: "Unable to fetch Queue",
        cause: `Unable to exchange code for token. Dumping error\r\n---\r\naccess_token does not exist on data response`,
      });
    }
  }
});
