import getOauth from "./api/getOauth";
import listCodes from "./api/listCodes";

async function main() {
  try {
    const accessToken = await getOauth();
    const codes = await listCodes(accessToken);
    console.log("Liste des codes :", codes);
  } catch (error) {
    console.error("Erreur :", error);
  }
}

main();
