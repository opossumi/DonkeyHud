import { app, BrowserWindow, shell } from "electron";
import {
  checkDirectories,
  ipcMainHandle,
  ipcMainOn,
  isDev,
  showNotification,
  getPreloadPath,
  getUIPath,
} from "./helpers/index.js";
import { shutDown, startServer } from "./server/server.js";
import { getPlayers } from "./server/services/playersServices.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
import { createHudWindow } from "./hudWindow.js";
import http from "http";

let server: http.Server;
let mainWindow: BrowserWindow;

app.on("ready", () => {
  mainWindow = createMainWindow();
  checkDirectories();
  server = startServer(mainWindow);

  // Handle expects a response
  ipcMainHandle("getPlayers", async () => {
    const players = await getPlayers();
    return players;
  });

  ipcMainOn("sendFrameAction", (payload) => {
    switch (payload) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MINIMIZE":
        mainWindow.minimize();
        break;
      case "MAXIMIZE":
        mainWindow.maximize();
        break;
      case "CONSOLE":
        mainWindow.webContents.toggleDevTools();
    }
  });

  ipcMainOn("startOverlay", () => {
    const hudWindow = createHudWindow();
    hudWindow.show();
  });

  ipcMainOn("openExternalLink", (url) => {
    shell.openExternal(url);
  });

  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  createMenu(mainWindow);
});

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 800,
    height: 700,
    minHeight: 513,
    frame: false,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  return mainWindow;
}
function handleCloseEvents(mainWindow: BrowserWindow) {
  /* Handle minimizing to tray */
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    showNotification("Application still running but minimized to tray");
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  // Reset willClose when we open the app from the tray again
  app.on("before-quit", () => {
    willClose = true;
    shutDown(server);
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
