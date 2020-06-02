import axios from 'axios';
import qs from 'qs';
import { storageKeys } from '@/configs';
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
  getSmsCode({ phone }) {
    return this.instance.get('/sms_codes/', {
      params: {
        mobile: phone
      }
    });
  },
  login({ name: username, pwd: password }) {
    return this.instance.post('/authorizations/', {
      username,
      password
    });
  },
  loginByMobile({code: sms_code, phone: mobile}) {
    return this.instance.post("/users/sms_codes/", {mobile, sms_code})
  },
  register({
    name: username,
    pwd: password,
    phone: mobile,
    re_password,
    code: sms_code
  }) {
    return this.instance.post('/users/', {
      username,
      password,
      mobile,
      re_password,
      sms_code
    });
  },
  getHomeData() {
    return this.instance.get('/index/');
  },
  getMenu() {
    return this.instance.get('/categories/');
  },
  getCategoriesById({ id }) {
    return this.instance.get(`/categories/${id}/`);
  },
  getCategoriesDetail({ id }) {
    return this.instance.get(`/categories/${id}/news/`);
  },
  getNewsDetail({ news_id }) {
    return this.instance.get(`/news/${news_id}/`);
  },
  getDetailComments({ news_id }) {
    return this.instance.get(`/news/${news_id}/comments/`);
  },
  getSubComments({ news_id, comment_id }) {
    return this.instance.get(`/news/${news_id}/comments/${comment_id}/`);
  }
};
export default api;

// 添加请求拦截器
api.instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    const token = window.localStorage.getItem(storageKeys.token);
    if (!token) {
      setTimeout(() => {
        window.location.href = `${window.location.origin}${window.location.pathname}${window.location.search}#/login`;
      }, 100);
      return config;
    }
    config.headers = {
      ...config.headers,
      Authorization: `JWT ${token}`
    };
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // console.log('response', response);
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
