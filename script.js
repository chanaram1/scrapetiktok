//scrape tiktok videos from a tiktok user's profile

const puppeteer = require("puppeteer");
const fs = require("fs");

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.tiktok.com/@chriskjchoi"); //replace with your desired tiktok
  const selector = '[data-e2e="user-post-item-list"]';
  await page.waitForSelector(selector);
  const videos = await page.$$eval(`${selector} > div`, (els) => {
    return els.map((el) => {
      const hrefs = el.querySelectorAll("a");
      const url = new URL(hrefs[0].href).href;
      const title = hrefs[1].title;
      return { url, title };
    });
  });

  const urlsText = videos.map((video) => video.url).join("\n");
  const titlesText = videos.map((video) => video.title).join("\n");

  // Save video URLs to a .txt file
  fs.writeFile("video_urls.txt", urlsText, (err) => {
    if (err) throw err;
    console.log("Video URLs saved to video_urls.txt");
  });

  // Save video titles to a .txt file
  fs.writeFile("video_titles.txt", titlesText, (err) => {
    if (err) throw err;
    console.log("Video titles saved to video_titles.txt");
  });

  await browser.close();
}

main();
