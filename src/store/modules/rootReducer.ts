import { combineReducers } from 'redux';

import Cart from './loja/index';
import Favoritos from './favoritos/index';
import User from './user/index';
import SideBars from './sideBars/index'

export default combineReducers({
  User,
  Cart,
  Favoritos,
  SideBars
});
