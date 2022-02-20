const router = require('express').Router();
const {
  models: { Article, Source },
} = require('../db');

module.exports = router;

// GET request /api/sources/
router.get('/', async (req, res, next) => {
  try {
    const sources = await Source.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(sources);
  } catch (error) {
    console.error(error);
  }
});
