import path from "path";

const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

type ResponseData = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
};

export default async (): Promise<string> => {
  const apiUrl = "https://oauth.piste.gouv.fr/api/oauth/token";

  const scope = "openid";
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: dotenv.parsed.CLIENT_ID,
    client_secret: dotenv.parsed.CLIENT_SECRET,
    scope: scope,
  });

  const response = await fetch(apiUrl, {
    method: "POST",
    body: body,
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }

  const data: ResponseData = await response.json();
  return data.access_token;
};
