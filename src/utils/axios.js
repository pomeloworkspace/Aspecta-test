import { configure } from 'axios-hooks'
import LRU from 'lru-cache'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://service.aspecta.ai'
})

const cache = new LRU({ max: 10 })
axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response.status === 401 && !config._retry) {
      // we use this flag to avoid retrying indefinitely if
      // getting a refresh token fails for any reason
      config._retry = true;
      localStorage.setItem("token", await refreshAccessToken());

      return axios(config);
    }

    return Promise.reject(error);
  }
);
configure({ axios, cache })