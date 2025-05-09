// Action types
export enum CartTypes {
  GET_CART_REQUEST = '@repositories/GET_CART_REQUEST',
  LOAD_CART_SUCCES = '@repositories/LOAD_CART_SUCCES',
  LOAD_CART_FAILURE = '@repositories/LOAD_CART_FAILURE',
}

// Data types

export interface Cart {
  id:number;
  nome?: string | undefined;
  image?: string | undefined;
  valor: number;
  qtde: number;
}

// State type

export interface RepositoriesState {
  readonly data: Cart[];
  readonly loading: boolean;
  readonly error: boolean;
}
