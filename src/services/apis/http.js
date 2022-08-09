import { API_BASE_URL, STAKING_API_BASE_URL } from "app/config/constant";
import axios from "axios";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers:{
      accept: 'application/json',
      "Access-Control-Allow-Origin": "*"
    //   "X-user": "wXIMeKVEFFF1hV3GiFWit8uw",
    //  "X-sessiontoken":'r:8e677125ab6861ac1c927f29e7fba7fb'
  }
});
// export const STAKING_API = axios.create({
//   baseURL: STAKING_API_BASE_URL,
// });

http.interceptors.request.use((config) => {
  const userString = localStorage.getItem('ShibariumUser');
  const user = userString ? JSON.parse(userString): null;
  config.headers["X-user"] = user?.objectId;
  config.headers["X-sessiontoken"] = user?.sessionToken;
  return config;
}, (error) => {
  return Promise.reject(error);
});