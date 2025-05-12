import { action } from 'typesafe-actions';
import { UserTypes, IUser } from './types';

export const loadUserRequest = (email: string | null | undefined) => action(UserTypes.GET_USER_REQUEST, email);

export const loadSucces = (data: IUser) =>
  action(UserTypes.LOAD_USER_SUCCES, {data});

export const loadFailure = () => action(UserTypes.LOAD_USER_FAILURE);

