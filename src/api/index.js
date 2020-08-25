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
  process.env.NODE_ENV === 'development' ? '' : 'http://39.97.71.196:8000/api';

const api = {
  instance: axios.create({
    baseURL,
    // timeout: 10000,
    withCredentials: true
  }),
  setBaseUrl(iCode) {
    this.instance.defaults.baseURL = `${baseURL}/${iCode}`;
  },

  forgot({ phone, pwd: password, code: sms_code, re_pwd: re_password }) {
    return this.instance.put(`/users/retrieves/${phone}/`, {
      password,
      sms_code,
      re_password
    });
  },
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
  loginByMobile({ code: sms_code, phone: mobile }) {
    return this.instance.post('/users/sms_codes/', { mobile, sms_code });
  },
  register({
    name: username,
    pwd: password,
    phone: mobile,
    re_pwd: re_password,
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
  getCategoriesDetail({ id, page = 1 }) {
    return this.instance.get(`/categories/${id}/news/`, {
      params: {
        page
      }
    });
  },
  getNewsDetail({ news_id }) {
    return this.instance.get(`/news/${news_id}/`);
  },
  getDetailComments({ news_id, page = 1 }) {
    return this.instance.get(`/news/${news_id}/comments/`, {
      params: {
        page
      }
    });
  },
  getSubComments({ news_id, comment_id, page = 1 }) {
    return this.instance.get(`/news/${news_id}/comments/${comment_id}/`, {
      params: {
        page
      }
    });
  },
  postComment({
    news_id,
    content,
    replay_user_id: replay_user,
    parent_comment_id: parent
  }) {
    let data = { content };
    if (replay_user || parent) {
      data = {
        ...data,
        replay_user,
        parent
      };
    }

    return this.instance.post(`/news/${news_id}/comments/`, data);
  },
  putLikeComment({ news_id, comment_id }) {
    return this.instance.put(`/news/${news_id}/comments/${comment_id}/like/`);
  },
  deleteComment({ news_id, comment_id }) {
    return this.instance.delete(`/news/${news_id}/comments/${comment_id}/`);
  },
  postCollections({ news_id }) {
    return this.instance.post(`/news/${news_id}/collections/`);
  },
  postFollowed({ user_id }) {
    return this.instance.post(`/users/followers/${user_id}/`);
  },
  getAuthorInfo({ author_id }) {
    return this.instance.get(`/users/${author_id}/`);
  },
  getAuthorNews({ author_id, type, page = 1 }) {
    return this.instance.get(`/users/${author_id}/news/`, {
      params: {
        type,
        page
      }
    });
  },
  getUserInfo() {
    return this.instance.get('/users/infos/');
  },
  putUserInfo({
    company,
    departments,
    job,
    area,
    addr,
    intro,
    avatar_name,
    username
  }) {
    /* data：
    { "company": "广东财经野鸡学院", "departments": "管理部门", "job": "鸡头", "area": "xxx1", "addr": "xxx1", "intro": "爱学习,爱唠叨", "avatar_name": "FqF5ZWsuR4gfxQQu3pTixE9XrTmi", "username": "huang"
}
    */
    return this.instance.put('/users/infos/', {
      company,
      departments,
      job,
      area,
      addr,
      intro,
      avatar_name,
      username
    });
  },
  getAddress() {
    return this.instance.get('/addresses/');
  },
  postAddress({ receiver, area, address, mobile }) {
    return this.instance.post('/addresses/', {
      receiver,
      area,
      address,
      mobile
    });
  },
  putAddress({ address_id, receiver, area, address, mobile }) {
    return this.instance.put(`/addresses/${address_id}/`, {
      receiver,
      area,
      address,
      mobile
    });
  },
  deleteAddress({ address_id }) {
    return this.instance.put(`/addresses/${address_id}/`);
  },
  putDefaultAddress({ address_id }) {
    return this.instance.put(`/addresses/${address_id}/status/`);
  },
  getFans({ user_id, page = 1 }) {
    return this.instance.get(`/users/${user_id}/fans/`, {
      params: {
        page
      }
    });
  },
  getFollowPeople({ user_id, page = 1 }) {
    return this.instance.get(`/users/${user_id}/followers/`, {
      params: {
        page
      }
    });
  },
  postOrder({ goods_id, count, address_id }) {
    return this.instance.post('/orders/', {
      good: goods_id,
      count,
      address: address_id
    });
  },
  getGoods({ page = 1 }) {
    return this.instance.get('/goods/', {
      params: {
        page
      }
    });
  },
  getGoodById({ id }) {
    return this.instance.get('/goods/' + id + '/');
  },
  getOrders({ page = 1 }) {
    return this.instance.get('/orders/', {
      params: {
        page
      }
    });
  },
  getHistories() {
    return this.instance.get('/news/histories/');
  },
  postImg({ blob }) {
    return this.instance.post('/media/images/', blob, {
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
    });
  },
  getCategories() {
    return this.instance.get('/news/categories/');
  },
  postNews({
    category,
    type = 'GraphText',
    title,
    index_image_name,
    video_desc,
    video_name,
    content,
    digest
  }) {
    return this.instance.post('/news/', {
      category,
      type,
      title,
      index_image_name,
      video_desc,
      video_name,
      content,
      digest
    });
  },
  getQiNiuToken() {
    return this.instance.get('/qiniu/tokens/');
  },
  getSearch({ search, page = 1 }) {
    return this.instance.get('/search/news/', {
      params: {
        search,
        page
      }
    });
  },
  getCategoriesAdById({ id: categoriesId }) {
    return this.instance.get(`/categories/${categoriesId}/contents/`, {
      cache: true
    });
  },
  postSignIn() {
    return this.instance.post('/users/signin/');
  },
  getTest({ id }) {
    return this.instance.get('/questions/' + id + '/');
  },
  postTestAnswers(data) {
    return this.instance.post('/commit/questions/', data);
  }
};
export default api;

// 添加请求拦截器
api.instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = window.localStorage.getItem(storageKeys.token);

    config.headers = {
      ...config.headers,
      Authorization: token && `JWT ${token}`
    };
    if (config.cache) {
      let source = axios.CancelToken.source();
      config.cancelToken = source.token;
      let data = JSON.parse(sessionStorage.getItem(config.url));
      console.log(data);
      if (data) {
        source.cancel(data);
      }
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.instance.interceptors.response.use(
  function (config) {
    // 对响应数据做点什么
    if (config.config.method === 'get' && config.config.cache) {
      sessionStorage.setItem(config.config.url, JSON.stringify(config));
    }
    return config;
  },
  function (error) {
    // 对响应错误做点什么
    if (axios.isCancel(error)) {
      return Promise.resolve(error.message);
    }
    if (/addresses/.test(error.response.config.url)) {
      return Promise.reject(error);
    }
    if (error.response && error.response.status === 401) {
      window.localStorage.setItem(storageKeys.token, '');

      setTimeout(() => {
        window.location.href = `${window.location.origin}${window.location.pathname}${window.location.search}#/login`;
      }, 100);
    }

    return Promise.reject(error);
  }
);
