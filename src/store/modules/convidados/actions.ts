import { action } from 'typesafe-actions';
import { UserTypes, IConvidado } from './types';

export const loadConvidadosRequest = () => action(UserTypes.GET_CONVIDADOS_REQUEST);

export const loadSucces = (data: IConvidado[]) =>
  action(UserTypes.LOAD_CONVIDADOS_SUCCES, {data});

export const loadFailure = () => action(UserTypes.LOAD_CONVIDADOS_FAILURE);

