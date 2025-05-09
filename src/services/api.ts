import axios from 'axios';

const api = axios.create({
  baseURL: 'https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/shopProfile',
});

export default api;
