import axios from 'axios';

// Constant
const SET_ARTICLES = 'SET_ARTICLES';

// Creators
const setArticles = (articles) => ({
  type: SET_ARTICLES,
  articles,
});

// Thunk
export const fetchArticles = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/articles');
    return dispatch(setArticles(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default function (articles = [], action) {
  switch (action.type) {
    case SET_ARTICLES:
      return [...action.articles];
    default:
      return articles;
  }
}
