import React from 'react';
import { toast } from '@/utils/protocol';

export const appContext = React.createContext({});

export const getUserInfo = async () => {
  // eslint-disable-next-line no-undef
  const ypAPI = new YpProDefinit({});
  const userInfo = await ypAPI.YpJsToSetLoginInfo();
  return userInfo;
};

export const getParames = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return r[2];
  } else {
    return null;
  }
};

/**
 * 检测请求的数据
 * @param {*} response
 */
export const checkResponse = (response, sucesss, notlogin) => {
  const { code, result, message } = response;
  switch (code) {
    case 100:
      if (sucesss) sucesss(result);
      return result;
    case 99:
      if (notlogin) notlogin();
      return result;
    default:
      toast(message);
      return {};
  }
};

/**
 * 节流函数
 * @param {*} func
 * @param {*} wait
 */
export const throttle = (func, wait) => {
  let ctx;
  let args;
  let rtn;
  let timeoutID;
  let last = 0;

  return function throttled(...args2) {
    ctx = this;
    args = args2;
    const delta = Number(new Date()) - last;
    if (!timeoutID)
      if (delta - last >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    return rtn;
  };

  function call() {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }
};

/**
 * 解决滑动穿透问题
 */
export const ModalHelper = {
  afterOpen() {
    this.scrollTop = document.scrollingElement
      ? document.scrollingElement.scrollTop
      : document.body.scrollTop;
    document.documentElement.classList.add('fix_open');
    document.documentElement.style.top = `-${this.scrollTop}px`;
  },
  beforeClose() {
    document.documentElement.classList.remove('fix_open');
    document.documentElement.style.top = '0px';
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = this.scrollTop;
    } else {
      document.documentElement.scrollTop = this.scrollTop;
    }
    window.scroll(0, this.scrollTop);
  },
};
