const db = require('./db');

// Models
const Source = require('./models/Source');
const Article = require('./models/Article');

// Associations
Source.hasMany(Article);
Article.belongsTo(Source);

module.exports = {
  db,
  models: {
    Source,
    Article,
  },
};
