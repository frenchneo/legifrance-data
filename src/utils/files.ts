import fs from "fs";

export function writeInFile(data: string, filePath: string) {
  try {
    const file = fs.writeFileSync("output/" + filePath, data);
    console.log(`File ${filePath} has been created.`);
  } catch (err) {
    console.error(err);
    throw new Error(`Error writing file: ${err.message}`);
  }
}
