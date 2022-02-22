'use strict';

const {
  db,
  models: { Source, Article },
} = require('../server/db');
const { scrapeAllArticles } = require('../server/lib/scrapers');

async function seed() {
  try {
    // sync db
    await db.sync({ force: true });
    console.log('db synced..');

    const sources = await Promise.all([
      Source.create({ id: 1, name: 'Rappler' }),
      Source.create({ id: 2, name: 'Philstar' }),
      Source.create({ id: 3, name: 'Manila Times' }),
      Source.create({ id: 4, name: 'Manila Bulletin' }),
    ]);

    const articles = await scrapeAllArticles();

    const seededArticles = await Promise.all(
      articles.map((article) => {
        Article.create({
          sourceId: article.sourceId,
          title: article.title,
          link: article.link,
        });
      })
    );

    console.log('Sources Seeded: ', sources.length);
    console.log('Articles Seeded: ', seededArticles.length);
    console.log(`seeded successfully`);
  } catch (error) {
    console.error(error);
  }
}

async function runSeed() {
  console.log('seeding..');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
  // finally {
  //   console.log('closing db connection');
  //   await db.close();
  //   console.log('db connection closed');
  // }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
