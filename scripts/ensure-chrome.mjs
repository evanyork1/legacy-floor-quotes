// Ensures a Chrome binary is available for Puppeteer at build time.
// Lovable/Netlify build envs often set PUPPETEER_SKIP_DOWNLOAD=true during
// `npm install`, so the browser never gets downloaded. We install it
// explicitly here (cached between deploys via netlify-plugin-cache).
import { execSync } from "node:child_process";
import puppeteer from "puppeteer";

const cacheDir =
  process.env.PUPPETEER_CACHE_DIR ||
  `${process.env.HOME || "/opt/build/repo"}/.cache/puppeteer`;

try {
  const path = puppeteer.executablePath();
  // If the file exists, executablePath() returns a real path; try launching check.
  execSync(`test -x "${path}"`, { stdio: "ignore" });
  console.log(`[ensure-chrome] Chrome already present at ${path}`);
} catch {
  console.log(`[ensure-chrome] Installing Chrome into ${cacheDir} ...`);
  execSync("npx --yes puppeteer browsers install chrome", {
    stdio: "inherit",
    env: { ...process.env, PUPPETEER_CACHE_DIR: cacheDir },
  });
  console.log("[ensure-chrome] Chrome install complete.");
}
