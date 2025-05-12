// Action types
export enum FavTypes {
  GET_FAV_REQUEST = '@repositories/GET_FAV_REQUEST',
  LOAD_FAV_SUCCES = '@repositories/LOAD_FAV_SUCCES',
  LOAD_FAV_FAILURE = '@repositories/LOAD_FAV_FAILURE',
}

// Data types

export interface Fav {
  nome?: string | undefined;
  image?: string | undefined;
  valor: number;
}

// State type

export interface RepositoriesState {
  readonly data: Fav[];
  readonly loading: boolean;
  readonly error: boolean;
}
