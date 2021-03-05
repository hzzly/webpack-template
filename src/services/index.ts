import { fetch } from '@youpai/common';

// const delay = (ms) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });

/**
 * get 请求
 * @param {*} params
 */
export async function get(params: any) {
  return fetch({
    url: `/xxxxxxx.html`,
    data: params,
  });
}

/**
 * post 请求
 * @param {*} params
 */
export async function post(params: any) {
  return fetch({
    url: `/xxxxxxx.html`,
    method: 'post',
    data: params,
  });
}
