import { Reducer } from 'redux';
import { RepositoriesState, FavTypes, Fav } from './types';

const INNITAL_STATE: RepositoriesState = {
  data: [],
  error: false,
  loading: false,
};
interface LoadFavSuccessAction {
  type: typeof FavTypes.LOAD_FAV_SUCCES;
  payload: { data: Fav[] };
}

interface GetFavRequestAction {
  type: typeof FavTypes.GET_FAV_REQUEST;
}

interface LoadFavFailureAction {
  type: typeof FavTypes.LOAD_FAV_FAILURE;
}

type CartAction = GetFavRequestAction | LoadFavSuccessAction | LoadFavFailureAction;

const reducer: Reducer<RepositoriesState, CartAction> = (state = INNITAL_STATE, action) => {
  switch (action.type) {
    case FavTypes.GET_FAV_REQUEST:
      return { ...state, loading: true };
    case FavTypes.LOAD_FAV_SUCCES:
      return {
        ...state,
        loading: false,
        error: false,
        data: action?.payload?.data,
      };
    case FavTypes.LOAD_FAV_FAILURE:
      return { ...state, loading: false, error: true, data: [] };
    default:
      return state;
  }
};

export default reducer;
