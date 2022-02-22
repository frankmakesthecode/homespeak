const scrapeRappler = require('./rappler');
const scrapeAbscbn = require('./abscbn');
const scrapePhilstar = require('./philstar');
const scrapeManilaBul = require('./manilaBulletin');

const scrapeAllArticles = async () => {
  try {
    const rappler = await scrapeRappler();
    const abscbn = await scrapeAbscbn();
    const philstar = await scrapePhilstar();
    const manilaBulletin = await scrapeManilaBul();

    return [...rappler, ...abscbn, ...philstar, ...manilaBulletin];
  } catch (error) {
    console.error(error);
  }
};

module.exports = scrapeAllArticles;
