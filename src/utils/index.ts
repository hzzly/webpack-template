import Toast from '@/components/Toast';

export function log(...message: any): void {
  if (window.console && (getParamByName('log') || process.env.NODE_ENV === 'development')) {
    // eslint-disable-next-line no-console
    console.log(...message);
  }
}

/**
 * get search value
 * @param {string} name - search key
 * @param {string} url - url
 * @returns {string}
 */
export function getParamByName(name: string, url: string = window.location.search): string {
  // eslint-disable-next-line no-useless-escape
  const key = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${key}=([^&#]*)`);
  let curl = url;
  if (typeof history.pushState !== 'function') {
    curl = window.location.hash; // ie9
  }
  const results = regex.exec(curl);
  return results == null ? '' : decodeURIComponent(results[1]);
}

export const getParames = (name: any): string | null => {
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
export const checkResponse = (response: any, sucesss: Function, notlogin: Function) => {
  const { code, result, message } = response;
  switch (code) {
    case 100:
      if (sucesss) sucesss(result);
      return result;
    case 99:
      if (notlogin) notlogin();
      return result;
    default:
      Toast(message);
      return {};
  }
};

/**
 * 节流函数
 * @param {*} func
 * @param {*} wait
 */
export const throttle = (func: Function, wait: number) => {
  let ctx: any;
  let args: any[];
  let rtn: any;
  let timeoutID: any;
  let last = 0;

  return function throttled(...args2: any[]) {
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
