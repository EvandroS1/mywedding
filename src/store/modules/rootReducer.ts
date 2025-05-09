import { combineReducers } from 'redux';

import Cart from './loja/index';
import Favoritos from './favoritos/index';

export default combineReducers({
  Cart,
  Favoritos,
});
