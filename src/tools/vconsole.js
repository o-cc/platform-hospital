import vconsoleReloadPlugin from './vconsoleReloadPlugin';
if (process.env.REACT_APP_VCONSOLE !== 'false') {
  if (!/localhost/.test(window.location.origin)) {
    const VConsole = require('vconsole');
    const vc = new VConsole();
    vc.addPlugin(vconsoleReloadPlugin(VConsole));
  }
}
