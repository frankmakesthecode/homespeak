import axios from 'axios';

// Constant
const SET_SOURCES = 'SET_SOURCES';

// Creators
const setSources = (sources) => ({
  type: SET_SOURCES,
  sources,
});

// Thunk
export const fetchSources = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/sources');
    return dispatch(setSources(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default function (sources = [], action) {
  switch (action.type) {
    case SET_SOURCES:
      return [...action.sources];
    default:
      return sources;
  }
}
