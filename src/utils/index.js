export function log(...message) {
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
export function getParamByName(name, url = window.location.search) {
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
