import { call, put, Effect, ForkEffect, all, takeLatest } from 'redux-saga/effects';
import api from '@/services/api';
import { ActionType } from 'typesafe-actions';
import { loadSucces, loadFailure, loadFavRequest, loadUpdateFavRequest } from './actions';
import IUsers from '../../../../types/user';
import { FavTypes } from './types';
import { loadUserRequest } from '../user/actions';

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

function* updateFav(action: ActionType<typeof loadUpdateFavRequest>): Generator<Effect, void, unknown> {
  try {
    const { fav, id, email } = action.payload;
    (yield call(api.put, `/${id}`, {favoritos: fav})) as ApiResponse; // 👈 ajuste aqui!

    yield put(loadFavRequest(email));
    yield put(loadUserRequest(email));

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
  takeLatest(FavTypes.UPDATE_FAV_REQUEST, updateFav),
])
