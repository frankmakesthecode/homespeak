const puppeteer = require('puppeteer');
const handleDuplicates = require('../handleDuplicates');

const scrapeManilaBul = async () => {
  try {
    const chromeOptions = {
      headless: true,
      defaultViewport: null,
      args: [
        '--incognito',
        '--no-sandbox',
        '--single-process',
        '--no-zygote',
        '--disable-setuid-sandbox',
      ],
    };
    const url = 'https://mb.com.ph/news/';
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    );

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    // Grab news headlines
    const results = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.title > a')).map((elem) => {
        const data = {};

        data.sourceId = 4;
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

module.exports = scrapeManilaBul;
