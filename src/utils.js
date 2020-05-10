const baseWidth = 750;
export const vw = function (px, base = baseWidth) {
  return `${(px / 750) * 100}vw`;
};

export const isIOS = function () {
  return process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
};
