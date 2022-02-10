const { db } = require('./db');
const PORT = process.env.PORT || 2401;
const app = require('./app');

const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    } else {
      await db.sync();
    }

    app.listen(PORT, () => console.log(`Coming to you live from port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

init();
