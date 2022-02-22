const puppeteer = require('puppeteer');
const handleDuplicates = require('../handleDuplicates');

const scrapeManilaTimes = async () => {
  try {
    const chromeOptions = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };
    const url = 'https://www.manilatimes.net/news';
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
      const elem = document.querySelector('div.article-title-h1 > a');

      const headline = {};
      headline.sourceId = 3;
      headline.title = elem.innerText;
      headline.link = elem.href;

      const latest = Array.from(
        document.querySelectorAll('div.article-title-h3 > a')
      ).map((elem) => {
        const data = {};

        data.sourceId = 3;
        data.title = elem.innerText;
        data.link = elem.href;

        return data;
      });

      const moreNews = Array.from(
        document.querySelectorAll('div.article-title-h4 > a')
      ).map((elem) => {
        const data = {};

        data.sourceId = 3;
        data.title = elem.innerText;
        data.link = elem.href;

        return data;
      });

      return [headline, ...latest, ...moreNews];
    });

    await browser.close();
    return results;
  } catch (error) {
    console.error(error);
  }
};
// const scrapeAbscbn = async () => {
//   try {
//     const chromeOptions = {
//       headless: true,
//       defaultViewport: null,
//       args: [
//         '--incognito',
//         '--no-zygote',
//         '--single-process',
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//       ],
//     };

//     const url = 'https://news.abs-cbn.com/anc/exclusives';
//     const browser = await puppeteer.launch(chromeOptions);
//     const page = await browser.newPage();
//     await page.setUserAgent(
//       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
//     );

//     await page.goto(url, {
//       waitUntil: 'domcontentloaded',
//       timeout: 0,
//     });

//     await page.screenshot({ fullPage: true, path: 'screenshot.png' });
//     // Grab news headlines
//     const results = await page.evaluate(() => {
//       const elem = document.querySelector('a.section-top1-title-link');
//       const headline = {};
//       headline.sourceId = 3;
//       headline.title = elem.innerHTML;
//       headline.link = elem.href;

//       const latest = Array.from(
//         document.querySelectorAll('a.s-title-small-link')
//       ).map((elem) => {
//         const data = {};

//         data.sourceId = 3;
//         data.title = elem.innerHTML;
//         data.link = elem.href;

//         return data;
//       });
//       const related = Array.from(document.querySelectorAll('a.li')).map(
//         (elem) => {
//           const data = {};

//           data.sourceId = 3;
//           data.title = elem.innerText;
//           data.link = elem.href;

//           return data;
//         }
//       );

//       return [headline, ...latest, ...related];
//     });

//     // Handle Duplicates
//     const news = handleDuplicates(results);
//     await browser.close();
//     return news;
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports = scrapeManilaTimes;
