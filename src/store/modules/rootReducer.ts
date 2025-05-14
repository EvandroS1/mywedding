import { combineReducers } from 'redux';

import Cart from './loja/index';
import Favoritos from './favoritos/index';
import User from './user/index';
import Users from './users/index';
import SideBars from './sideBars/index'

export default combineReducers({
  Users,
  User,
  Cart,
  Favoritos,
  SideBars
});
