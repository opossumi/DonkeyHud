import { app, BrowserWindow, Menu, shell } from "electron";
import {
  checkDirectories,
  ipcMainHandle,
  ipcMainOn,
  isDev,
  showNotification,
} from "./util.js";
import { shutDown, startServer } from "./server/server.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { getPlayers } from "./server/services/playersServices.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
import { createHudWindow } from "./hudWindow.js";
import http from "http";

/* 
TODO: Auto generate cfg file in users steam cfg folder
TODO: Added login/auth system with supabase
TODO: Use actual Teams data for setting a players team
TODO: Auto-update for app
TODO: Select/Delete all for player cards and teams/matches tables
TODO: Delete confirmation buttons/alerts
TODO: Light/Dark modes and or themes
*/

let server: http.Server;

// Disable custom menu when not in dev
if (isDev() !== true) {
  Menu.setApplicationMenu(null);
}

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 800,
    height: 700,
    minHeight: 500,
    frame: isDev(),
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    /* if in dev, load the vite server on the port we gave it in vite.config.ts */
    mainWindow.loadURL("http://localhost:5123");
  } else {
    /* if not in dev load the built react file using built in path module from node (so it works on all platforms) */
    mainWindow.loadFile(getUIPath());
  }

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
