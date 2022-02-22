import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../store/articles';
import { fetchSources } from '../store/sources';

import NewsList from './NewsList';

const Home = (props) => {
  const { sources, articles, loadSources, loadArticles } = props;
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    loadSources();
    loadArticles();
  }, []);

  const handleSearch = (e) => {
    setSearchFilter(e.target.value);
  };

  return (
    <>
      <div id="search-container">
        <input
          id="search-filter"
          placeholder="search"
          value={searchFilter}
          onChange={handleSearch}
        />
      </div>
      <div id="home">
        {sources.map((source) => {
          return (
            <NewsList
              key={source.id}
              source={source}
              filter={searchFilter}
              articles={articles.filter((article) => {
                if (
                  article.sourceId === source.id &&
                  article.title
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase())
                ) {
                  return article;
                }
              })}
            />
          );
        })}
      </div>
    </>
  );
};

const mapState = (state) => ({
  sources: state.sources,
  articles: state.articles,
});

const mapDispatch = (dispatch) => ({
  loadSources: () => dispatch(fetchSources()),
  loadArticles: () => dispatch(fetchArticles()),
});

export default connect(mapState, mapDispatch)(Home);
