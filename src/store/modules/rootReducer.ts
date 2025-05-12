import { combineReducers } from 'redux';

import Cart from './loja/index';
import Favoritos from './favoritos/index';
import User from './user/index';

export default combineReducers({
  User,
  Cart,
  Favoritos,
});
