const puppeteer = require('puppeteer');

const scrapeRappler = async () => {
  try {
    const chromeOptions = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };
    const url = 'https://www.rappler.com/section/nation/';
    const browser = await puppeteer.launch(chromeOptions);
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

    await browser.close();
    return results;
  } catch (error) {
    console.error(error);
  }
};

module.exports = scrapeRappler;
