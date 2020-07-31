import { stringify } from 'qs';
import request from '@/utils/request';
import { getUserInfo } from '@/utils/protocol';

// const delay = (ms) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });

export async function getHeader() {
  if (!window.userInfo.loginToken || !window.userInfo.loginAuthCode) {
    const res = await getUserInfo();
    return {
      MAUTH: res.token,
      MAUTHCODE: res.authCode,
    };
  }
  return {
    MAUTH: window.userInfo.loginToken,
    MAUTHCODE: window.userInfo.loginAuthCode,
  };
}

/**
 * get
 * @param {*} params
 */
export async function get(params) {
  const headers = await getHeader();
  return request({
    url: `${window.apiHost}/xxxxxxx.html?${stringify(params)}`,
    headers,
  });
}

/**
 * post
 * @param {*} params
 */
export async function post(params) {
  const headers = await getHeader();
  return request({
    url: `${window.apiHost}/xxxxxxx.html`,
    method: 'post',
    data: params,
    headers,
  });
}
