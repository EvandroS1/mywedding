import { Reducer } from 'redux';
import { RepositoriesState, UserTypes, IUser } from './types';

const INNITAL_STATE: RepositoriesState = {
  data: {
    id: undefined,
    nome: null,
    email: null,
    ProfilePic: null,
    typeAuth: null,
    carrinho: [],
    favoritos: [],
    pedidos: [],
    createdAt: undefined,
  },
  error: false,
  loading: false,
};

interface LoadCartSuccessAction {
  type: typeof UserTypes.LOAD_USER_SUCCES;
  payload: { data: IUser };
}

interface GetCartRequestAction {
  type: typeof UserTypes.GET_USER_REQUEST;
}

interface LoadCartFailureAction {
  type: typeof UserTypes.LOAD_USER_FAILURE;
}

type CartAction = GetCartRequestAction | LoadCartSuccessAction | LoadCartFailureAction;

const reducer: Reducer<RepositoriesState, CartAction> = (state = INNITAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.GET_USER_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_USER_SUCCES:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case UserTypes.LOAD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        data: INNITAL_STATE.data,
      };
    default:
      return state;
  }
};

export default reducer;
