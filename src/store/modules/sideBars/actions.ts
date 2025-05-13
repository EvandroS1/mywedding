import { action } from 'typesafe-actions';
import { UserTypes, ISideBars } from './types';


export const loadSideBarRequest = ({cartOpen, favOpen}: ISideBars) => action(UserTypes.GET_SIDEBARS_REQUEST, {cartOpen, favOpen});

export const loadSucces = (data: ISideBars) =>
  action(UserTypes.LOAD_SIDEBARS_SUCCES, {data});

export const loadFailure = () => action(UserTypes.LOAD_SIDEBARS_FAILURE);

