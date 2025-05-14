import { action } from 'typesafe-actions';
import { UserTypes } from './types';
import { IUser } from '../user/types';

export const loadUsersRequest = () => action(UserTypes.GET_USERS_REQUEST);

export const postUsersRequest = ({nome, email, senha, typeAuth, carrinho, favoritos ,ProfilePic}: IUser) => action(UserTypes.POST_USERS_REQUEST, {nome, email, senha, typeAuth, carrinho, favoritos,ProfilePic});

export const loadSucces = (data: IUser[]) =>
  action(UserTypes.LOAD_USERS_SUCCES, {data});

export const loadFailure = () => action(UserTypes.LOAD_USERS_FAILURE);

