/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The root directory of the application.
     */
    APP_ROOT: string;
    /**
     * Public directory path, typically `/dist/` or `/public/`.
     */
    VITE_PUBLIC: string;
  }
}

// Define the exposed Electron API
interface Window {
  ipcRenderer: {
    /**
     * Opens a dialog for the user to select a directory.
     * @returns A Promise resolving to the selected directory path or `null` if the user cancels.
     */
    selectDirectory: () => Promise<string | null>;
    /**
     * Copies the provided text to the clipboard.
     * @param text The text to copy.
     */
    copyToClipboard: (text: string) => void;
    /**
     * Sends a custom IPC message to the main process.
     * @param channel The IPC channel name.
     * @param args Additional arguments.
     */
    send: (channel: string, ...args: any[]) => void;
    /**
     * Sends a request to the main process and waits for a response.
     * @param channel The IPC channel name.
     * @param args Additional arguments.
     * @returns A Promise resolving to the main process's response.
     */
    invoke: <T>(channel: string, ...args: any[]) => Promise<T>;
    on: (channel: string, ...args: any[]) => Promise<T>;
    saveImage: (
      filePath: string,
      image: string,
      fileName: string
    ) => Promise<T>;
    openFileExplorer: (filePath: string) => Promise<void>;
  };
}
