import axios from "axios";
import { configs } from "eslint-plugin-react-refresh";

export const http =  axios.create({
    baseURL: 'http://localhost:3000'
})

http.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    }
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
},

);