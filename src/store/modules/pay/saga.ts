import {
  call,
  put,
  Effect,
  ForkEffect,
  all,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import { loadFailure, postPayRequest } from "./actions";
import { UserTypes } from "./types";
import { ActionType } from "typesafe-actions";

interface MercadoPagoPreferenceResponse {
  data: { init_point: string };
}

function* postPay(action: ActionType<typeof postPayRequest>): Generator<Effect, void, MercadoPagoPreferenceResponse> {
  try {
  const { items, userName, userEmail, userId, images, userImage } = action.payload;

  console.log('images', images)

    const formattedItems = items.map((item) => ({
      title: item.nome ?? "Item sem nome",
      quantity: item.qtde,
      currency_id: "BRL",
      unit_price: item.valor,
      id: item.id,
      description: item.desc,
    }));

    const response: { data: { init_point: string } } = yield call(
      axios.post,
      "/api/pay",{items: formattedItems, userName, userEmail, userId, images, userImage}
    );

    const initPoint = response.data.init_point;


    // Redireciona o usuário para o Mercado Pago
    if (typeof window !== "undefined") {
      window.location.href = initPoint;
    }
  } catch (error: unknown) {
    yield put(loadFailure());
    if (error instanceof Error) {
      console.log("Erro ao redirecionar para checkout:", error.message);
    } else {
      console.log("Unknown error", error);
    }
  }
}

export default all<ForkEffect<never>>([
  takeLatest(UserTypes.POST_PAY_REQUEST, postPay),
]);
