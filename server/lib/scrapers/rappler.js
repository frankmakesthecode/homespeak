const puppeteer = require('puppeteer');
const handleDuplicates = require('../handleDuplicates');

const scrapeRappler = async () => {
  try {
    const url = 'https://www.rappler.com/section/nation/';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    );

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    const results = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h3 > a')).map((elem) => {
        const data = {};

        data.sourceId = 1;
        data.title = elem.innerText;
        data.link = elem.href;

        return data;
      });
    });

    // Handle Duplicates
    const news = handleDuplicates(results);
    await browser.close();
    return news;
  } catch (error) {
    console.error(error);
  }
};

module.exports = scrapeRappler;
