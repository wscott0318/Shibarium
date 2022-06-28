import axios from "axios";

export const http = axios.create({
  baseURL: `http://18.219.186.181:5020/`,
//   headers:{
//       Authorization:`Bearer ${accessToken}`,
//       accept: 'text/plain',
//       // "Content-Type": "multipart/form-data"
//   }
});

