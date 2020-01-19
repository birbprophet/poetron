import puppeteer from "puppeteer";

export const scrapeFunction = (url: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.setViewport({ width: 1366, height: 768 });

      await page.goto(url);
      const { scrapedItems, nextPageUrl } = await page.evaluate(() => {
        /* Insert Scrape Function here */
        return { scrapedItems: [], nextPageUrl: null };
      });

      browser.close();
      return resolve({ scrapedItems, nextPageUrl });
    } catch (error) {
      return reject(error);
    }
  });
};
