import axios from 'axios';
import qs from 'qs';
const query = qs.parse(window.location.search.slice(1));

if (process.env.REACT_APP_PROD !== 'true')
  if (query.mock) {
    const mock = require('./mock').default;
    mock(axios);
  }

const baseURL =
  process.env.NODE_ENV === 'development' ? '' : 'http://192.168.1.105:8001/api';

const api = {
  instance: axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true
  }),
  getHomeData() {
    return this.instance.get('/index/');
  },
  getMenu() {
    return this.instance.get('/categories/');
  }
};
export default api;
