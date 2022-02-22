import React from 'react';

const NewsItem = ({ article }) => {
  return (
    <div className="article-item">
      <div>
        <a href={article.link} target="_blank">
          {article.title}
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
