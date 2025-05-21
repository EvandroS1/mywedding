import { call, put, Effect, ForkEffect, all, takeLatest } from 'redux-saga/effects';
import {convidados } from '@/services/api';
import { loadSucces, loadFailure } from './actions';
import { IConvidado, UserTypes } from './types';

interface ApiResponse {
  data: IConvidado[];
}

function* getConvidado(): Generator<Effect, void, unknown> {
  try {
    const response = (yield call(convidados.get, "")) as ApiResponse; // 👈 ajuste aqui!

    const conv: IConvidado[]= response.data
    yield put(loadSucces(conv));

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
  takeLatest(UserTypes.GET_CONVIDADOS_REQUEST, getConvidado),
])
