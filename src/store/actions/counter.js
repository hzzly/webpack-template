import { ADD, MINUS } from '../types';

export const add = () => {
  return {
    type: ADD,
  };
};
export const minus = () => {
  return {
    type: MINUS,
  };
};
