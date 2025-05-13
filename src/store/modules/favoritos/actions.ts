import { action } from 'typesafe-actions';
import { Fav, FavTypes } from './types';
import IFavItem from '../../../../types/fav';

export const loadFavRequest = (email: string | null | undefined) => action(FavTypes.GET_FAV_REQUEST, email);

export const loadUpdateFavRequest = (fav: Fav[], id: number | undefined, email: string | undefined | null) => action(FavTypes.UPDATE_FAV_REQUEST, {fav, id, email});

export const loadSucces = (data: IFavItem[]) =>
  action(FavTypes.LOAD_FAV_SUCCES, {data});

export const loadFailure = () => action(FavTypes.LOAD_FAV_FAILURE);

