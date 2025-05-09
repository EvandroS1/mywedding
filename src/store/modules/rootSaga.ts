import { all } from "redux-saga/effects";

import Cart from "./loja/saga";
import Favoritos from "./favoritos/saga";

export default function* rootSaga(): Generator {
  return yield all([
    Cart,
    Favoritos,
  ]);
}
