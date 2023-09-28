import getOauth from "./api/getOauth";
import listCodes from "./api/listCodes";
import getTables from "./api/getTables";

async function main() {
  try {
    const accessToken = await getOauth();
    const codes = await listCodes(accessToken);
    let completedCount = 0;

    for (const code of codes) {
      const newAccessToken = await getOauth();
      await getTables(newAccessToken, code.id, code.lastUpdate);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      completedCount++;
    }

    console.log(
      `\x1b[33m All iterations are complete. Number of iterations : ${completedCount} \x1b[0m`
    );
  } catch (error) {
    console.error("Erreur :", error);
  }
}

main();
