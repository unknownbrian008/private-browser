const blockList = [
  "doubleclick.net",
  "google-analytics.com",
  "facebook.com/tr",
  "adsystem.com"
];

function blockAds(details, callback) {
  const url = details.url;
  const blocked = blockList.some(domain => url.includes(domain));
  callback({ cancel: blocked });
}

module.exports = { blockAds };
