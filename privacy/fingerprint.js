function hardenFingerprint(webContents) {
  webContents.executeJavaScript(`
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 4 });
    Object.defineProperty(navigator, 'deviceMemory', { get: () => 8 });
    Intl.DateTimeFormat = () => ({ resolvedOptions: () => ({ timeZone: "UTC" }) });
  `);
}

module.exports = { hardenFingerprint };
