import { Reducer } from 'redux';
import { IConvidado, RepositoriesState, UserTypes } from './types';

const INNITAL_STATE: RepositoriesState = {
  data: [{
    nome: "",
    confirmado: false
  }],
  error: false,
  loading: false,
};

interface LoadCartSuccessAction {
  type: typeof UserTypes.LOAD_CONVIDADOS_SUCCES;
  payload: { data: IConvidado[] };
}

interface GetCartRequestAction {
  type: typeof UserTypes.GET_CONVIDADOS_REQUEST;
}

interface LoadCartFailureAction {
  type: typeof UserTypes.LOAD_CONVIDADOS_FAILURE;
}

type CartAction = GetCartRequestAction | LoadCartSuccessAction | LoadCartFailureAction;

const reducer: Reducer<RepositoriesState, CartAction> = (state = INNITAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.GET_CONVIDADOS_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_CONVIDADOS_SUCCES:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case UserTypes.LOAD_CONVIDADOS_FAILURE:
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
