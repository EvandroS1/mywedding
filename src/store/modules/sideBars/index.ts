import { Reducer } from "redux";
import { ISideBars, RepositoriesState, UserTypes } from "./types";

const INNITAL_STATE: RepositoriesState = {
  data: {
    cartOpen: false,
    favOpen: false,
  },
  error: false,
  loading: false,
};

interface LoadCartSuccessAction {
  type: typeof UserTypes.LOAD_SIDEBARS_SUCCES;
  payload: { data: ISideBars };
}

interface GetCartRequestAction {
  type: typeof UserTypes.GET_SIDEBARS_REQUEST;
}

interface LoadCartFailureAction {
  type: typeof UserTypes.LOAD_SIDEBARS_FAILURE;
}

type CartAction =
  | GetCartRequestAction
  | LoadCartSuccessAction
  | LoadCartFailureAction;

const reducer: Reducer<RepositoriesState, CartAction> = (
  state = INNITAL_STATE,
  action
) => {
  switch (action.type) {
    case UserTypes.GET_SIDEBARS_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_SIDEBARS_SUCCES:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case UserTypes.LOAD_SIDEBARS_FAILURE:
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
