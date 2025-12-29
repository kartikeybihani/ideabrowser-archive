const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // TODO: replace with actual IdeaBrowser URL
  const IDEA_URL = "https://ideabrowser.com";

  await page.goto(IDEA_URL, { waitUntil: "networkidle" });

  const html = await page.content();

  const today = new Date().toISOString().slice(0, 10);
  const ideaDir = path.join("ideas", today);

  fs.mkdirSync(ideaDir, { recursive: true });
  fs.writeFileSync(path.join(ideaDir, "index.html"), html);

  await browser.close();
})();
