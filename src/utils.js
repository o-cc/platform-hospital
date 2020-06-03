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

export const getQueryKey = (key, url = window.location.href) => {
  let query = qs.parse(url.slice(url.lastIndexOf('?') + 1));
  return query[key] && query[key];
};


const unit = ['', '', '', '', '万', '十万', '百万'];
const unitMap = [1, 10, 100, 1000, 10000, 100000, 1000000];
export const keepPoint = (num = 0, bit) => {
  if (num.toString().length < bit) return num;
  bit = bit >> 0;
  num = (num / unitMap[bit]).toFixed(1).toString();
  if (/.0/.test(num)) num = num.match(/^\d+(?:)?/);
  return `${num} ${unit[bit]}`;
};
