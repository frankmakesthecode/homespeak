const puppeteer = require('puppeteer');
const handleDuplicates = require('../handleDuplicates');

const scrapePhilstar = async () => {
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
    const url = 'https://www.philstar.com/headlines';
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
      const headlines = Array.from(
        document.querySelectorAll('div.carousel__item__title > h3 > a')
      ).map((elem) => {
        const data = {};

        data.sourceId = 2;
        data.title = elem.innerText;
        data.link = elem.href;

        return data;
      });

      const latest = Array.from(
        document.querySelectorAll('div.news_title > a')
      ).map((elem) => {
        const data = {};

        data.sourceId = 2;
        data.title = elem.innerHTML;
        data.link = elem.href;

        return data;
      });

      return [...headlines, ...latest];
    });

    // Handle Duplicates
    const news = handleDuplicates(results);
    await browser.close();

    return news;
  } catch (error) {
    console.error(error);
  }
};

module.exports = scrapePhilstar;
