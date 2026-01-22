const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("privacy", {
  info: () => "Private Browser Mode Enabled"
});
