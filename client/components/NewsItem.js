import React from 'react';

const NewsItem = ({ article }) => {
  return (
    <a className="article-item" href={article.link} target="_blank">
      {article.title}
    </a>
  );
};

export default NewsItem;
