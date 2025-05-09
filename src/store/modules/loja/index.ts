import { Reducer } from 'redux';
import { RepositoriesState, CartTypes, Cart } from './types';

const INNITAL_STATE: RepositoriesState = {
  data: [],
  error: false,
  loading: false,
};

interface LoadCartSuccessAction {
  type: typeof CartTypes.LOAD_CART_SUCCES;
  payload: { data: Cart[] };
}

interface GetCartRequestAction {
  type: typeof CartTypes.GET_CART_REQUEST;
}

interface LoadCartFailureAction {
  type: typeof CartTypes.LOAD_CART_FAILURE;
}

type CartAction = GetCartRequestAction | LoadCartSuccessAction | LoadCartFailureAction;

const reducer: Reducer<RepositoriesState, CartAction> = (state = INNITAL_STATE, action) => {
  switch (action.type) {
    case CartTypes.GET_CART_REQUEST:
      return { ...state, loading: true };
    case CartTypes.LOAD_CART_SUCCES:
      return {
        ...state,
        loading: false,
        error: false,
        data: action?.payload?.data,
      };
    case CartTypes.LOAD_CART_FAILURE:
      return { ...state, loading: false, error: true, data: [] };
    default:
      return state;
  }
};

export default reducer;
