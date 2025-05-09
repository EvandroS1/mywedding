import { call, put, Effect, ForkEffect, all, takeLatest } from 'redux-saga/effects';
import api from '@/services/api';
import { ActionType } from 'typesafe-actions';
import { loadSucces, loadFailure, loadCartRequest } from './actions';
import IUsers from '../../../../types/user';
import { CartTypes } from './types';

interface ApiResponse {
  data: IUsers[];
}

function* getCart(action: ActionType<typeof loadCartRequest>): Generator<Effect, void, unknown> {
  try {
    const email = action.payload;
    const response = (yield call(api.get, "")) as ApiResponse; // 👈 ajuste aqui!

    const user = response.data.find((user) => user.email === email);
    if (!user) {
      console.log('User not found');
      return;
    }
    yield put(loadSucces(user.carrinho));

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
  takeLatest(CartTypes.GET_CART_REQUEST, getCart),
])
