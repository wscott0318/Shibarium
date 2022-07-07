import { API_BASE_URL, STAKING_API_BASE_URL } from "app/config/constant";
import axios from "axios";

export const http = axios.create({
  baseURL: API_BASE_URL,
//   headers:{
//       Authorization:`Bearer ${accessToken}`,
//       accept: 'text/plain',
//       // "Content-Type": "multipart/form-data"
//   }
});
export const STAKING_API = axios.create({
  baseURL: STAKING_API_BASE_URL,
});
