import api from './api';
import qs from 'qs';

const baseWidth = 750;
export const vw = function (px, base = baseWidth) {
  return `${(px / 750) * 100}vw`;
};

export const isIOS = function () {
  return process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const getObjKey = (obj, index) => {
  if (typeof obj !== 'object') return obj;
  if (index === undefined) return Object.keys(obj);
  return Object.keys(obj)[index];
};

export const requestApi = async (name, params = {}) => {
  let res = {};
  try {
    res.result = await api[name](params).then(res => res.data);
  } catch (e) {
    if (e.response && typeof e.response.data === 'object') {
      let key = getObjKey(e.response.data, 0);
      res.error = JSON.stringify(e.response.data[key]);
    } else {
      res.error = e.message;
    }
  }

  return res;
};

export const query = qs.parse(window.location.search.slice(1));

export const getQueryByKey = (key, url = window.location.href) => {
  let query = qs.parse(url.slice(url.lastIndexOf('?') + 1));
  return query[key] && query[key];
};
