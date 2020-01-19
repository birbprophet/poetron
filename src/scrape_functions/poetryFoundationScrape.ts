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
        const scrapedItemElements =
          document
            .querySelector("div.c-assetViewport.isInteractive")
            ?.querySelectorAll("div.c-feature.c-mix-feature_shrinkwrap") || [];

        const scrapedItems = Array.from(scrapedItemElements, item => ({
          title: (<HTMLElement>(
            item.querySelector("div.c-feature-hd")
          ))?.innerText.trim(),
          author: (<HTMLElement>(
            item.querySelector("span.c-txt.c-txt_attribution")
          ))?.innerText
            .replace("BY ", "")
            .trim(),
          url:
            item.querySelector("div.c-feature-hd")?.querySelector("a")?.href ||
            "",
          tags: Array.from(
            item.querySelectorAll("a.c-btn.c-btn_tag.c-btn_tag_auxiliary"),
            tag => (<HTMLElement>tag).innerText
          )
        }));

        const nextPageSelectorExists =
          document.querySelector(
            "svg.icon.icon_angleRight.icon_sm.mix-icon_inherit"
          ) !== null;

        const paginationControls = document.querySelectorAll(
          "a.c-pagination-control"
        );

        const nextPageUrl = nextPageSelectorExists
          ? (<HTMLAnchorElement>paginationControls[1]).href
          : null;

        return { scrapedItems, nextPageUrl };
      });

      browser.close();
      return resolve({ scrapedItems, nextPageUrl });
    } catch (error) {
      return reject(error);
    }
  });
};
