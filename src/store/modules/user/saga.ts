import { call, put, Effect, ForkEffect, all, takeLatest } from 'redux-saga/effects';
import {api} from '@/services/api';
import { ActionType } from 'typesafe-actions';
import { loadSucces, loadFailure, loadUserRequest } from './actions';
import { IUser, UserTypes } from './types';

interface ApiResponse {
  data: IUser[];
}

function* getUser(action: ActionType<typeof loadUserRequest>): Generator<Effect, void, unknown> {
  try {
    const email = action.payload;
    const response = (yield call(api.get, "")) as ApiResponse; // 👈 ajuste aqui!
    console.log('response', response)
    const user = response.data.find((user) => user?.email === email);
    if (!user) {
      console.log('User not found');
      return;
    }
    yield put(loadSucces(user));

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
  takeLatest(UserTypes.GET_USER_REQUEST, getUser),
])
