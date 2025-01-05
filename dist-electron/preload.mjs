"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(
      channel,
      (event, ...args2) => listener(event, ...args2)
    );
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  // You can expose other APTs you need here.
  // ...
  selectDirectory: async () => {
    return electron.ipcRenderer.invoke("select-directory");
  },
  saveImage: async (filePath, image, fileName) => {
    return electron.ipcRenderer.invoke("save-image", filePath, image, fileName);
  },
  openFileExplorer: (filePath) => electron.ipcRenderer.invoke("open-file-explorer", filePath)
});
