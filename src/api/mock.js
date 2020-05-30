import MockAdapter from 'axios-mock-adapter';
import mockData from './mockData';

function mock(ax) {
  const mo = new MockAdapter(ax, {
    delayResponse: 50
  });

  Object.keys(mockData)
    .reduce((mo, key) => {
      let [method, pathname] = key.split(':');
      mo[method](pathname).reply(200, mockData[key]);
      return mo;
    }, mo)
    .onAny()
    .passThrough();
}
export default mock;
