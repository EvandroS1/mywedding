import { CartItemPedido } from "../../../../types/cart";

// Action types
export enum UserTypes {
  GET_RECEBIDOS_REQUEST = "@repositories/POST_RECEBIDOS_REQUEST",
  LOAD_RECEBIDOS_SUCCES = "@repositories/LOAD_RECEBIDOS_SUCCES",
  LOAD_RECEBIDOS_FAILURE = "@repositories/LOAD_RECEBIDOS_FAILURE",
}

// Data types
export interface IRecebidos {
  id: string;
  nome: string;
  userImage: string;
  items: CartItemPedido[];
  transaction_amount: string;
  createdAt: string;

}

export interface RepositoriesState {
  readonly data: IRecebidos[];
  readonly loading: boolean;
  readonly error: boolean;
}
