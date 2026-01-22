const { app, BrowserWindow, session } = require("electron");
const path = require("path");
const { blockAds } = require("./privacy/adblock");
const { hardenFingerprint } = require("./privacy/fingerprint");
const { enableTor } = require("./privacy/tor");

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const ses = session.fromPartition("nopersist");

  enableTor(ses);

  ses.webRequest.onBeforeRequest(blockAds);

  win.webContents.on("did-finish-load", () => {
    hardenFingerprint(win.webContents);
  });

  ses.setPermissionRequestHandler((_wc, _perm, cb) => cb(false));

  win.loadFile("renderer/index.html");
}

app.whenReady().then(createWindow);

