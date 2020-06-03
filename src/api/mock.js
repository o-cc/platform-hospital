import MockAdapter from 'axios-mock-adapter';
import mockData from './mockData';
import { getQueryKey } from '@/utils';
function evil(fn) {
  var Fn = Function;
  return new Fn('return ' + fn)();
}
function updateKey(results, id = 'id') {
  return results.map(item => ({
    ...item,
    [id]: Number(item[id]) + 1
  }));
}
let test = {};
function getNextPage(defaultData, activeKey) {
  let page, results;
  if (test.page) {
    page = test.page;
  } else {
    page = getQueryKey('page', defaultData.next) << 0;
  }

  if (test.results) {
    results = test.results;
  } else {
    results = defaultData.results;
  }

  page = page + 1;
  results = updateKey(results, activeKey);

  test.results = results;
  test.page = page;

  return {
    page,
    results
  };
}
function mock(ax) {
  const mo = new MockAdapter(ax, {
    delayResponse: 50
  });

  Object.keys(mockData)
    .reduce((mo, key) => {
      let [method, pathname] = key.split(':');
      if (pathname.indexOf('d+') >= 0) pathname = evil(pathname);
      mo[method](pathname).reply(config => {
        if (config.params && config.params.page) {
          //重写mockData
          let activeKey;
          if (/\/users\/\d+\/news\//.test(config.url)) activeKey = 'user_id';
          let { page, results } = getNextPage(mockData[key], activeKey);

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
