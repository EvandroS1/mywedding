import { action } from 'typesafe-actions';
import { UserTypes } from './types';
import CartItemProps from '../../../../types/cart';

export const postPayRequest = (items: CartItemProps[], userName: string | null | undefined, userEmail: string | null | undefined) => action(UserTypes.POST_PAY_REQUEST,{items, userName, userEmail});
// export const postPayRequest = (cart: CartItemProps[]) => action(UserTypes.POST_PAY_REQUEST, cart);

export const loadSucces = (data: CartItemProps[]) =>
  action(UserTypes.LOAD_PAY_SUCCES, {data});

export const loadFailure = () => action(UserTypes.LOAD_PAY_FAILURE);

