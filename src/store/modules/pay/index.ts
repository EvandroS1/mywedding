import { Reducer } from 'redux';
import { RepositoriesState, UserTypes } from './types';
import { CartItemProps } from '../../../../types/cart';

const INNITAL_STATE: RepositoriesState = {
  data: [],
  error: false,
  loading: false,
};

interface LoadCartSuccessAction {
  type: typeof UserTypes.LOAD_PAY_SUCCES;
  payload: { data: CartItemProps[] };
}

interface GetCartRequestAction {
  type: typeof UserTypes.POST_PAY_REQUEST;
}

interface LoadCartFailureAction {
  type: typeof UserTypes.LOAD_PAY_FAILURE;
}

type CartAction = GetCartRequestAction | LoadCartSuccessAction | LoadCartFailureAction;

const reducer: Reducer<RepositoriesState, CartAction> = (state = INNITAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.POST_PAY_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_PAY_SUCCES:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case UserTypes.LOAD_PAY_FAILURE:
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
