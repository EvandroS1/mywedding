import CartItemProps from "../../../../types/cart";

// Action types
export enum UserTypes {
  POST_PAY_REQUEST = "@repositories/POST_PAY_REQUEST",
  LOAD_PAY_SUCCES = "@repositories/LOAD_PAY_SUCCES",
  LOAD_PAY_FAILURE = "@repositories/LOAD_PAY_FAILURE",
}

// Data types

export interface RepositoriesState {
  readonly data: CartItemProps[];
  readonly loading: boolean;
  readonly error: boolean;
}
