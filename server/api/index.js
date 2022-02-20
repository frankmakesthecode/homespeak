const router = require('express').Router();
module.exports = router;

router.use('/sources', require('./sources'));
router.use('/articles', require('./articles'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
