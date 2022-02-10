import axios from 'axios';

// Constant
const SET_PHILSTAR = 'SET_PHILSTAR';

// Creators
const setPhilstar = (philstar) => ({
  type: SET_PHILSTAR,
  philstar,
});

// Thunk
export const fetchPhilstar = () => async (dispatch) => {
  const { data } = await axios.get('/api/philstar');
  return dispatch(setPhilstar(data));
};

// Reducer
export default function (philstar = [], action) {
  switch (action.type) {
    case SET_PHILSTAR:
      return [...action.philstar];
    default:
      return philstar;
  }
}
