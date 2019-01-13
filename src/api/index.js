import Vue from 'vue';
import axios from 'axios';
import { base_url, staticToken } from '@/store/config';

const user = JSON.parse(localStorage.getItem('user'));
const token = user ? user.access_token : '';
const api = axios.create({
  baseURL: base_url,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    mode: 'no-cors',
  },
});

// const instanceUserApi = axios.create({
//   baseURL: base_url
// });
// instanceUserApi.defaults.headers.common["Authorization"] =
//   "Token" + localStorage.getItem("authToken");

Vue.prototype.$http = api;
export default api;
