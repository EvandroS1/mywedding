import CartItemProps from "../../../../types/cart";

// Action types
export enum UserTypes {
  GET_USER_REQUEST = "@repositories/GET_USER_REQUEST",
  LOAD_USER_SUCCES = "@repositories/LOAD_USER_SUCCES",
  LOAD_USER_FAILURE = "@repositories/LOAD_USER_FAILURE",
}

// Data types

export interface IUser {
  id: number | undefined;
  nome?: string | null;
  email?: string | null;
  ProfilePic?: string | null;
  typeAuth?: string | null;
  carrinho: CartItemProps[];
  favoritos: [];
  createdAt?: string;
}

// State type

export interface RepositoriesState {
  readonly data: IUser;
  readonly loading: boolean;
  readonly error: boolean;
}
