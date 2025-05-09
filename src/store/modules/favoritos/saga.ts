import { call, put, Effect, ForkEffect, all, takeLatest } from 'redux-saga/effects';
import api from '@/services/api';
import { ActionType } from 'typesafe-actions';
import { loadSucces, loadFailure, loadFavRequest } from './actions';
import IUsers from '../../../../types/user';
import { FavTypes } from './types';

interface ApiResponse {
  data: IUsers[];
}

function* getFav(action: ActionType<typeof loadFavRequest>): Generator<Effect, void, unknown> {
  try {
    const email = action.payload;
    const response = (yield call(api.get, "")) as ApiResponse; // 👈 ajuste aqui!

    const user = response.data.find((user) => user.email === email);
    if (!user) {
      console.log('User not found');
      return;
    }
    yield put(loadSucces(user.favoritos));

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
  takeLatest(FavTypes.GET_FAV_REQUEST, getFav),
])
