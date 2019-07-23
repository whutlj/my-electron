import {get} from './fetch';
export const hotList = () => {
  return get('/playlist/hot');
};