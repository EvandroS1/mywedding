import { all } from "redux-saga/effects";

import Cart from "./loja/saga";
import Favoritos from "./favoritos/saga";
import User from "./user/saga";

export default function* rootSaga(): Generator {
  return yield all([
    User,
    Cart,
    Favoritos,
  ]);
}
