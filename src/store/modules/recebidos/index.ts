import { Reducer } from 'redux';
import { IRecebidos, RepositoriesState, UserTypes } from './types';

const INNITAL_STATE: RepositoriesState = {
  data: [],
  error: false,
  loading: false,
};

interface LoadCartSuccessAction {
  type: typeof UserTypes.LOAD_RECEBIDOS_SUCCES;
  payload: { data: IRecebidos[] };
}

interface GetCartRequestAction {
  type: typeof UserTypes.GET_RECEBIDOS_REQUEST;
}

interface LoadCartFailureAction {
  type: typeof UserTypes.LOAD_RECEBIDOS_FAILURE;
}

type CartAction = GetCartRequestAction | LoadCartSuccessAction | LoadCartFailureAction;

const reducer: Reducer<RepositoriesState, CartAction> = (state = INNITAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.GET_RECEBIDOS_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_RECEBIDOS_SUCCES:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case UserTypes.LOAD_RECEBIDOS_FAILURE:
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
