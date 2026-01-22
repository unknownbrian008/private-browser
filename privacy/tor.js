function enableTor(session) {
  session.setProxy({
    proxyRules: "socks5://127.0.0.1:9050"
  });
}

module.exports = { enableTor };
