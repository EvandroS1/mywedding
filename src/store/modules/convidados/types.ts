// Action types
export enum UserTypes {
  GET_CONVIDADOS_REQUEST = "@repositories/GET_CONVIDADOS_REQUEST",
  LOAD_CONVIDADOS_SUCCES = "@repositories/LOAD_CONVIDADOS_SUCCES",
  LOAD_CONVIDADOS_FAILURE  = "@repositories/LOAD_CONVIDADOS_FAILURE",
}

// Data types

export interface IConvidado {
  id?: number;
  nome: string;
  confirmado: boolean;
}

// State type

export interface RepositoriesState {
  readonly data: IConvidado[];
  readonly loading: boolean;
  readonly error: boolean;
}
