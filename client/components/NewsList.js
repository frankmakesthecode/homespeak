import React from 'react';
import NewsItem from './NewsItem';

const NewsList = ({ source, filter, articles }) => {
  return (
    <div className="news">
      <div className="source-title">
        <h4>{source.name}</h4>
      </div>
      <div className="list">
        {!articles.length ? (
          <h4>No relevant articles</h4>
        ) : (
          articles.map((article) => {
            return <NewsItem key={article.link} article={article} />;
          })
        )}
      </div>
    </div>
  );
};

export default NewsList;
