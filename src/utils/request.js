import axios from 'axios';
import { stringify } from 'qs';
import Toast from '@/components/Toast';

const { CancelToken } = axios;
const httpPending = []; // 用于存储每个ajax请求的取消函数和ajax标识

// 取消请求方法
const cancelHttp = (config = {}) => {
  const url = config.url.substring(0, config.url.indexOf('?'));
  httpPending.forEach((e, i) => {
    if (e.u === `${url}&${config.method}`) {
      // 当前请求在数组中存在时执行函数体
      e.f(); // 执行取消操作
      httpPending.splice(i, 1); // 把这条记录从数组中移除
    }
  });
};

function checkStatus(response) {
  if (!response.data) {
    Toast('网络异常，请重试~');
  }

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  // Toast('errortext');
}

const request = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
  withCredentials: true,
  timeout: 30000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 取消上一次未完成的相同请求，注意项目中是否存在风险
    cancelHttp(config);

    const url = config.url.substring(0, config.url.indexOf('?'));
    // eslint-disable-next-line no-param-reassign
    config.cancelToken = new CancelToken((c) => {
      // 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      httpPending.push({ u: `${url}&${config.method}`, f: c });
    });

    // 针对 post 请求参数字符串化
    if (config.method === 'post') {
      // eslint-disable-next-line no-param-reassign
      config.data = stringify(config.data);
    }
    return config;
  },
  (error) => {
    // 错误
    Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    cancelHttp(response.config);

    return checkStatus(response);
  },
  (error) => {
    if (axios.isCancel(error)) {
      Promise.reject(error);
      return;
    }
    // 错误
    // toast(error);
    Promise.reject(error);
    return { code: 999, message: error, result: {} };
  }
);

export default request;
