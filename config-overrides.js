const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');
module.exports = override(
  addWebpackAlias({
    '@': path.join(__dirname, '.', 'src')
  }),

  config => {
    return config;
  }
);
