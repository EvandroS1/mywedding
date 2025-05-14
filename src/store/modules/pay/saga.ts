import { call, put, Effect, ForkEffect, all, takeLatest } from 'redux-saga/effects';
import { pay } from '@/services/api'; // deve estar com baseURL do Mercado Pago
import { loadFailure } from './actions';
import { UserTypes } from './types';

interface MercadoPagoPreferenceResponse {
  data: {init_point: string; } 
  // Adicione outras propriedades que você espera na resposta
}
function* postPay(): Generator<Effect, void, MercadoPagoPreferenceResponse> {

console.log('-----------entro---------------')
  try {
    const token = process.env.NEXT_PUBLIC_MP_TOKEN;

    if (!token) {
      throw new Error("Token do Mercado Pago não encontrado nas variáveis de ambiente.");
    }

    const response: MercadoPagoPreferenceResponse = yield call(pay.post, "", {
      items: [
        {
          title: "Produto Teste1",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 24
        },
        {
          title: "Produto Teste2",
          quantity: 2,
          currency_id: "BRL",
          unit_price: 12
        }
      ],
      back_urls: {
        success: "https://wedding-beige-psi.vercel.app/presentes",
        failure: "https://wedding-beige-psi.vercel.app/presentes",
        pending: "https://wedding-beige-psi.vercel.app/presentes"
      },
      auto_return: "approved"
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const initPoint = response?.data.init_point;
    console.log("Checkout URL:", initPoint);

    // Redireciona o usuário para o Mercado Pago
    if (typeof window !== "undefined") {
      window.location.href = initPoint;
    }

  } catch (error: unknown) {
    yield put(loadFailure());
    if (error instanceof Error) {
      console.log('error', error.message);
    } else {
      console.log('Unknown error', error);
    }
  }
}


export default all<ForkEffect<never>>([
  takeLatest(UserTypes.POST_PAY_REQUEST, postPay),
]);
