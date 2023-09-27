export default async (bearer: string) => {
  const apiUrl =
    "https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app/list/code";

  const body = {
    pageSize: 10,
    sort: "TITLE_ASC",
    pageNumber: 1,
    codeName: "Code civil",
    states: ["VIGUEUR", "ABROGE", "VIGUEUR_DIFF"],
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer" + bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }
  const data = await response.json();
  return data;
};
