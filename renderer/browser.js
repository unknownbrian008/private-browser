const webview = document.getElementById("browser");
const input = document.getElementById("url");

function navigate() {
  let url = input.value.trim();

  if (!url.startsWith("http")) {
    url = "https://duckduckgo.com/?q=" + encodeURIComponent(url);
  }

  webview.src = url;
}

// Disable navigation tracking
webview.addEventListener("did-navigate", () => {
  input.value = webview.getURL();
});
