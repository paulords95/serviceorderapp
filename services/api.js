import axios from 'axios'


const api = axios.create({
  baseURL: "http://192.168.0.11:5000",
  //baseURL: "http://apioracle.paulo.dev.br:5000",
});

export default api;