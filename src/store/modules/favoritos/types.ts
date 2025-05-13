// Action types
export enum FavTypes {
  GET_FAV_REQUEST = '@repositories/GET_FAV_REQUEST',
  LOAD_FAV_SUCCES = '@repositories/LOAD_FAV_SUCCES',
  LOAD_FAV_FAILURE = '@repositories/LOAD_FAV_FAILURE',
  UPDATE_FAV_REQUEST = '@repositories/UPDATE_FAV_REQUEST',

}

// Data types

export interface Fav {
  id: number
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
