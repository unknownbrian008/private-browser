const { app, BrowserWindow, session } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Privacy-first session settings
  const ses = session.defaultSession;

  ses.setPermissionRequestHandler((_webContents, permission, callback) => {
    // Deny all permissions by default
    callback(false);
  });

  ses.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders["DNT"] = "1";
    delete details.requestHeaders["Referer"];
    callback({ requestHeaders: details.requestHeaders });
  });

  win.loadFile("renderer/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
