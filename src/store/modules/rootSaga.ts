import { all } from "redux-saga/effects";

import Cart from "./loja/saga";
import Favoritos from "./favoritos/saga";
import User from "./user/saga";
import Users from "./users/saga";
import Pay from "./pay/saga";
import Convidados from "./convidados/saga";
import Recebidos from "./recebidos/saga";
import Sidebars from "./sideBars/saga";

export default function* rootSaga(): Generator {
  return yield all([
    Users,
    User,
    Cart,
    Pay,
    Favoritos,
    Convidados,
    Recebidos,
    Sidebars
  ]);
}
