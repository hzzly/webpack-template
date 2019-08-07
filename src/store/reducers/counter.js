import { ADD, MINUS } from '../types';

const defaultState = {
  num: 0,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      };
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      };
    default:
      return state;
  }
};
