import { fileURLToPath } from "url";
import * as path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

export async function getImageFilePath(imageName: string): Promise<string> {
  const basePath = VITE_DEV_SERVER_URL
    ? path.join("public", "photos")
    : path.join(__dirname, "..", "..", "app", "public", "photos");
  return path.join(basePath, imageName);
}
