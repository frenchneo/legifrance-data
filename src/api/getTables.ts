import { writeInFile } from "../utils/files";

export default async (bearer: string, textId: string, date: string) => {
  console.log(`Getting tables for ${textId} on ${date} with bearer ${bearer}`);
  const apiUrl =
    "https://api.piste.gouv.fr/dila/legifrance/lf-engine-app/consult/code";

  const body = {
    textId,
    date,
    sctCid: textId,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }
  const data = await response.json();
  const filename = `tables/${textId}-${Date.now()}.json`;
  writeInFile(JSON.stringify(data, null, 2), filename);
  return data;
};
