'use strict';

const {
  db,
  models: { Source, Article },
} = require('../server/db');

async function seed() {
  // sync db
  await db.sync({ force: true });
  console.log('db synced..');

  const sources = await Promise.all([
    Source.create({ id: 1, name: 'Rappler' }),
    Source.create({ id: 2, name: 'Philstar' }),
    Source.create({ id: 3, name: 'ABS CBN' }),
    Source.create({ id: 4, name: 'Manila Bulletin' }),
  ]);

  console.log(`seeded ${sources.length} sources`);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding..');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
