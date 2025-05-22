import { combineReducers } from 'redux';

import Cart from './loja/index';
import Favoritos from './favoritos/index';
import User from './user/index';
import Users from './users/index';
import Pay from './pay/index';
import Convidados from './convidados/index'
import Recebidos from './recebidos/index'

import SideBars from './sideBars/index'


export default combineReducers({
  Users,
  User,
  Cart,
  Pay,
  Favoritos,
  Convidados,
  Recebidos,
  SideBars
});
