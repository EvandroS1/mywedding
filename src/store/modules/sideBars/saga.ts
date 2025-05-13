import { put, Effect, ForkEffect, all, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { loadSucces, loadSideBarRequest } from './actions';
import { UserTypes } from './types';



function* setSideBar(action: ActionType<typeof loadSideBarRequest>): Generator<Effect, void, unknown> {
    const {cartOpen, favOpen} = action.payload;
    console.log('cartOpen, favOpen', cartOpen, favOpen)

    yield put(loadSucces({cartOpen, favOpen}));

}


export default all<ForkEffect<never>>([
  takeLatest(UserTypes.GET_SIDEBARS_REQUEST, setSideBar),
])
