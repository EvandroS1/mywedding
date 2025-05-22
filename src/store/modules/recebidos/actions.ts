import { action } from 'typesafe-actions';
import { IRecebidos, UserTypes } from './types';

export const GetRecebidosRequest = () => action(UserTypes.GET_RECEBIDOS_REQUEST);

export const loadSucces = (data: IRecebidos[]) =>
  action(UserTypes.LOAD_RECEBIDOS_SUCCES, {data});

export const loadFailure = () => action(UserTypes.LOAD_RECEBIDOS_FAILURE);

