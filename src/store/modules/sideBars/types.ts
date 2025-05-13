// Action types
export enum UserTypes {
  GET_SIDEBARS_REQUEST = "@repositories/GET_SIDEBARS_REQUEST",
  LOAD_SIDEBARS_SUCCES = "@repositories/LOAD_SIDEBARS_SUCCES",
  LOAD_SIDEBARS_FAILURE = "@repositories/LOAD_SIDEBARS_FAILURE",
}

// Data types

export interface ISideBars {
  cartOpen: boolean;
  favOpen: boolean;
}

// State type

export interface RepositoriesState {
  readonly data: ISideBars;
  readonly loading: boolean;
  readonly error: boolean;
}
