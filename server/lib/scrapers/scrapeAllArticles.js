const scrapeRappler = require('./rappler');
const scrapeManilaTimes = require('./manilaTimes');
const scrapePhilstar = require('./philstar');
const scrapeManilaBul = require('./manilaBulletin');
const handleDuplicates = require('../handleDuplicates');

const scrapeAllArticles = async () => {
  try {
    const rappler = await scrapeRappler();
    const manilaTimes = await scrapeManilaTimes();
    const philstar = await scrapePhilstar();
    const manilaBulletin = await scrapeManilaBul();

    return handleDuplicates([
      ...rappler,
      ...manilaTimes,
      ...philstar,
      ...manilaBulletin,
    ]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = scrapeAllArticles;
