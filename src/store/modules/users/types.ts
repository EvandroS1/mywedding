import { IUser } from "../user/types";

// Action types
export enum UserTypes {
  GET_USERS_REQUEST = "@repositories/GET_USERS_REQUEST",
  POST_USERS_REQUEST = "@repositories/POST_USERS_REQUEST",
  LOAD_USERS_SUCCES = "@repositories/LOAD_USERS_SUCCES",
  LOAD_USERS_FAILURE = "@repositories/LOAD_USERS_FAILURE",
}

// Data types

// State type

export interface RepositoriesState {
  readonly data: IUser[];
  readonly loading: boolean;
  readonly error: boolean;
}
