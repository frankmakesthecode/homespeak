import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../store/articles';
import { fetchSources } from '../store/sources';

import NewsList from './NewsList';

const Home = (props) => {
  const { sources, articles, loadSources, loadArticles } = props;

  useEffect(() => {
    loadSources();
    loadArticles();
  }, []);

  return (
    <div id="home">
      {sources.map((source) => {
        return (
          <NewsList
            key={source.id}
            source={source}
            articles={articles.filter((article) => {
              if (article.sourceId === source.id) {
                return article;
              }
            })}
          />
        );
      })}
    </div>
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
