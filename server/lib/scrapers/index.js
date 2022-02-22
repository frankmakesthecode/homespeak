const scrapeRappler = require('./rappler');
const scrapeManilaTimes = require('./manilaTimes');
const scrapePhilstar = require('./philstar');
const scrapeManilaBul = require('./manilaBulletin');
const scrapeAllArticles = require('./scrapeAllArticles');

module.exports = {
  scrapeRappler,
  scrapeAbscbn,
  scrapePhilstar,
  scrapeManilaBul,
  scrapeAllArticles,
};
