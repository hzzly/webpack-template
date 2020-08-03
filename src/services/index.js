import { stringify } from 'qs';
import request from '@/utils/request';

// const delay = (ms) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });

/**
 * get
 * @param {*} params
 */
export async function get(params) {
  return request({ url: `/xxxxxxx.html?${stringify(params)}` });
}

/**
 * post
 * @param {*} params
 */
export async function post(params) {
  return request({
    url: `/xxxxxxx.html`,
    method: 'post',
    data: params,
  });
}
