import { app as c, BrowserWindow as h, ipcMain as a, dialog as u } from "electron";
import { fileURLToPath as T } from "node:url";
import f from "fs";
import { exec as v } from "node:child_process";
import i from "node:path";
import { fileURLToPath as g } from "url";
import * as s from "path";
const V = s.dirname(g(import.meta.url)), I = process.env.VITE_DEV_SERVER_URL;
async function j(o) {
  const n = I ? s.join("public", "photos") : s.join(V, "..", "..", "app", "public", "photos");
  return s.join(n, o);
}
const _ = i.dirname(T(import.meta.url));
process.env.APP_ROOT = i.join(_, "..");
const m = process.env.VITE_DEV_SERVER_URL, S = i.join(process.env.APP_ROOT, "dist-electron"), R = i.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = m ? i.join(process.env.APP_ROOT, "public") : R;
let e;
async function E() {
  const o = await import("node:path");
  e = new h({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(_, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e.maximize(), a.handle("select-directory", async () => {
    const n = await u.showOpenDialog({
      properties: ["openDirectory"]
    });
    return n.canceled ? null : n.filePaths[0];
  }), a.handle("get-image-file-path", async (n, r) => await j(r)), a.handle(
    "save-image",
    async (n, r, l, p) => {
      try {
        const t = o.resolve(r);
        if (!f.existsSync(t)) throw Error("File not found");
        const P = l.replace(/^data:image\/\w+;base64,/, ""), w = Buffer.from(P, "base64"), d = o.join(t, p);
        return f.writeFileSync(d, w), d;
      } catch {
        console.error("Something happened here");
      }
    }
  ), a.handle("open-file-explorer", (n, r) => new Promise((l, p) => {
    v(`explorer.exe "${r}"`, (t) => {
      t ? p(t) : l();
    });
  })), m ? e.loadURL(m) : e.loadFile(o.join(R, "index.html"));
}
c.on("window-all-closed", () => {
  process.platform !== "darwin" && (c.quit(), e = null);
});
c.on("activate", () => {
  h.getAllWindows().length === 0 && E();
});
c.whenReady().then(E);
export {
  S as MAIN_DIST,
  R as RENDERER_DIST,
  m as VITE_DEV_SERVER_URL
};
