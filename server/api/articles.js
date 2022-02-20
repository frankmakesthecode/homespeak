const router = require('express').Router();
const {
  models: { Article, Source },
} = require('../db');

module.exports = router;

// GET request /api/articles/
router.get('/', async (req, res, next) => {
  try {
    const articles = await Article.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
  }
});
