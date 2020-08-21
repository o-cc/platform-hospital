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

export function formatArray2Obj(contents = []) {
  return contents.reduce((prev, next) => {
    prev[next.key] = next;
    return prev;
  }, {});
}

export const requestApi = async (name, params = {}) => {
  let res = {};
  try {
    res.result = await api[name](params).then(res => res.data);
  } catch (e) {
    if (e.response && typeof e.response.data === 'object') {
      let key = getObjKey(e.response.data, 0);

      if (Array.isArray(e.response.data[key])) {
        res.error = e.response.data[key][0];
      } else {
        res.error = JSON.stringify(e.response.data[key]);
      }
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

export function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (Array.isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

export function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
