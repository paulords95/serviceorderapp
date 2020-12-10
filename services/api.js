import axios from 'axios'


const api = axios.create({
  baseURL: "http://apioracle.paulo.dev.br:5000",
});

export default api;