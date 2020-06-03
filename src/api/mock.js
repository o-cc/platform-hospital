import MockAdapter from 'axios-mock-adapter';
import mockData from './mockData';
import { getQueryKey } from '@/utils';
function evil(fn) {
  var Fn = Function;
  return new Fn('return ' + fn)();
}

let test = {};
function mock(ax) {
  const mo = new MockAdapter(ax, {
    delayResponse: 50
  });

  Object.keys(mockData)
    .reduce((mo, key) => {
      let [method, pathname] = key.split(':');
      if (pathname.indexOf('d+') >= 0) pathname = evil(pathname);
      mo[method](pathname).reply(config => {
        if (
          /comments/.test(config.url) &&
          config.params &&
          config.params.page
        ) {
          //重写mockData
          let page;
          if (test.page) {
            page = test.page;
          } else {
            page = getQueryKey('page', mockData[key].next) << 0;
          }

          let results;
          if (test.results) {
            results = test.results;
          } else {
            results = mockData[key].results;
          }

          page = page + 1;
          results = results.map(item => ({
            ...item,
            id: Number(item.id) + 1
          }));
         
          test.results = results;
          test.page = page;

          if (Number(config.params.page) < 10) {
            return [
              200,
              {
                ...mockData[key],
                next: mockData[key].next.replace(/page=\d/, 'page=' + page),
                results
              }
            ];
          } else {
            return [200, { ...mockData[key], next: '', results }];
          }
        }
        return [200, mockData[key]];
      });
      return mo;
    }, mo)
    .onAny()
    .passThrough();
}
export default mock;
