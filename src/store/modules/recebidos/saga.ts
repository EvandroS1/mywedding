import {
  call,
  put,
  Effect,
  ForkEffect,
  all,
  takeLatest,
} from "redux-saga/effects";
import { loadFailure, loadSucces } from "./actions";
import { IRecebidos, UserTypes } from "./types";
import { recebidos } from "@/services/api";

interface RecebidosResponse {
  data: IRecebidos[];
}

function* getRecebidos(): Generator<Effect, void, RecebidosResponse> {
  try {

    const response = (yield call(recebidos.get, "")) as RecebidosResponse; // 👈 ajuste aqui!
    console.log('response', response)
    yield put(loadSucces(response.data));

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
  takeLatest(UserTypes.GET_RECEBIDOS_REQUEST, getRecebidos),
]);
