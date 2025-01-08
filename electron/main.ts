import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { fileURLToPath } from "node:url";
import fs from "fs";
import { exec } from "node:child_process";
import path from "node:path";
import { getImageFilePath } from "../src/Helper/getImageFilePath";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

async function createWindow() {
  const path = await import("node:path");

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  win.maximize();

  ipcMain.handle("select-directory", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle("get-image-file-path", async (_event, imageName: string) => {
    return await getImageFilePath(imageName);
  });

  ipcMain.handle(
    "save-image",
    async (_, filePath: string, image: string, fileName: string) => {
      try {
        const IMAGE_UPLOAD_PATH = path.resolve(filePath);
        if (!fs.existsSync(IMAGE_UPLOAD_PATH)) throw Error("File not found");

        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const filePathWithName = path.join(IMAGE_UPLOAD_PATH, fileName);

        fs.writeFileSync(filePathWithName, buffer);
        return filePathWithName;
      } catch (error) {
        console.error("Something happened here");
      }
    }
  );

  ipcMain.handle("open-file-explorer", (_event, filePath: string) => {
    return new Promise<void>((resolve, reject) => {
      exec(`explorer.exe "${filePath}"`, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
