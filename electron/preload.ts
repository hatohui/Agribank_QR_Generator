import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
  selectDirectory: async (): Promise<string | null> => {
    return ipcRenderer.invoke("select-directory");
  },
  saveImage: async (
    filePath: string,
    image: string,
    fileName: string
  ): Promise<string | null> => {
    return ipcRenderer.invoke("save-image", filePath, image, fileName);
  },
  openFileExplorer: (filePath: string) =>
    ipcRenderer.invoke("open-file-explorer", filePath),
});
