import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/shopProfile',
});
export const pay = axios.create({
  baseURL: 'https://api.mercadopago.com/checkout/preferences'
})
export const convidados = axios.create({
  baseURL: 'https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/nome'
})

export const recebidos = axios.create({
  baseURL: 'https://6823ff4b65ba058033988478.mockapi.io/Recebidos'
})



