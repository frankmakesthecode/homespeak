const scrapeRappler = require('./rappler');
const scrapeManilaTimes = require('./abscbn');
const scrapePhilstar = require('./philstar');
const scrapeManilaBul = require('./manilaBulletin');

const scrapeAllArticles = async () => {
  try {
    const rappler = await scrapeRappler();
    const manilaTimes = await scrapeManilaTimes();
    const philstar = await scrapePhilstar();
    const manilaBulletin = await scrapeManilaBul();

    return [...rappler, ...manilaTimes, ...philstar, ...manilaBulletin];
  } catch (error) {
    console.error(error);
  }
};

module.exports = scrapeAllArticles;
