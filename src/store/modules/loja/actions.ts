import { action } from 'typesafe-actions';
import { CartTypes } from './types';
import CartItemProps from '../../../../types/cart';

export const loadCartRequest = (email: string | null | undefined) => action(CartTypes.GET_CART_REQUEST, email);

export const loadSucces = (data: CartItemProps[]) =>
  action(CartTypes.LOAD_CART_SUCCES, {data});

export const loadFailure = () => action(CartTypes.LOAD_CART_FAILURE);

