import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";
import { exec } from "node:child_process";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.maximize();
  ipcMain.handle("select-directory", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"]
    });
    return result.canceled ? null : result.filePaths[0];
  });
  ipcMain.handle(
    "save-image",
    async (_, filePath, image, fileName) => {
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
  ipcMain.handle("open-file-explorer", (_event, filePath) => {
    return new Promise((resolve2, reject) => {
      exec(`explorer.exe "${filePath}"`, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve2();
        }
      });
    });
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.removeMenu();
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
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
