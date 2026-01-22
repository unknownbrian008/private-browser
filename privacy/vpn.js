function checkVPN() {
  return process.env.VPN_ACTIVE === "true";
}

module.exports = { checkVPN };
