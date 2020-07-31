/* eslint-disable no-undef */
/**
 * 获取登录信息
 */
export const getUserInfo = async (callback) => {
  const ypAPI = new YpProDefinit({});
  const res = await ypAPI.YpJsToSetLoginInfo();
  window.userInfo.loginToken = res.token;
  window.userInfo.loginAuthCode = res.authCode;
  if (callback) callback(res);
  return res;
};

/**
 * toast
 * @param {*} msg
 */
export const toast = (msg) => {
  const toastOptionInfo = {
    name: 'YpJsToToast',
    jsonData: {
      msg,
      gravity: 1,
    },
  };
  const ypAPI = new YpProDefinit({});
  ypAPI.YpJsApiname(toastOptionInfo);
};
