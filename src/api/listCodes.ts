import { writeInFile } from "../utils/files";

type ResponseData = {
  executionTime: number;
  results: ApiResultItem[];
  states: ApiState;
  codeNames: ApiCodeNames;
  totalResultNumber: number;
};

type ApiResultItem = {
  id: string;
  cid: string;
  etat: "ABROGE" | "VIGUEUR";
  titre: string;
  dateDebut: string;
  dateFin: string;
  lastUpdate: string;
  pdfFileName: string | null;
  pdfFileSize: string | null;
  pdfFilePath: string | null;
};

type ApiState = {
  facetElem: null;
  field: "etat";
  values: Record<"ABROGE" | "VIGUEUR", number>;
  childs: Record<string, unknown>;
  totalElement: number;
};

type ApiCodeNames = {
  facetElem: null;
  field: "titreLong";
  values: Record<string, number>;
  childs: Record<string, unknown>;
  totalElement: number;
};

export default async (bearer: string) => {
  console.log("Listing codes");
  const apiUrl =
    "https://api.piste.gouv.fr/dila/legifrance/lf-engine-app/list/code";

  const body = {
    pageSize: 1000,
    pageNumber: 1,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }
  const data: ResponseData = await response.json();
  const filename = `codes/codes-${Date.now()}.json`;
  writeInFile(JSON.stringify(data, null, 2), filename);
  return data.results;
};
