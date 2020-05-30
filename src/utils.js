import api from './api';

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
    res.error = e.message;
  }

  return res;
};
