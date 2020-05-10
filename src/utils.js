const baseWidth = 750;
export const vw = function (px, base = baseWidth) {
  return `${(px / 750) * 100}vw`;
};
