  import {
    call,
    put,
    Effect,
    ForkEffect,
    all,
    takeLatest,
  } from "redux-saga/effects";
  import {api} from "@/services/api";
  import { loadSucces, loadFailure, postUsersRequest } from "./actions";
  import { UserTypes } from "./types";
  import { IUser } from "../user/types";
  import { ActionType } from "typesafe-actions";


  interface ApiResponse {
    data: IUser[];
  }

  function* getUsers(): Generator<Effect, void, unknown> {
    console.log("entro");
    try {
      const response = (yield call(api.get, "")) as ApiResponse; // 👈 ajuste aqui!
      console.log("response", response);
      yield put(loadSucces(response.data));
    } catch (error: unknown) {
      yield put(loadFailure());
      if (error instanceof Error) {
        console.log("error", error.message);
      } else {
        console.log("Unknown error", error);
      }
    }
  }


  function* postUsers(action: ActionType<typeof postUsersRequest>) {
    const { nome, email, senha, ProfilePic, typeAuth } = action.payload;
  
    try {
      const hashResponse: Response = yield call(fetch, '/api/hash-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: senha }),
      });
      // 1. Envia a senha para a Vercel Function para ser hasheada
  
      const { hashedPassword } = yield call([hashResponse, 'json']);
      console.log('hashedPassword', hashedPassword)
  
      // 2. Envia os outros dados do usuário junto com a senha hasheada para sua API de registro (se houver)
      const registerResponse = (yield call(api.post,"", { // Adapte a rota da sua API de registro
        nome,
        email,
        senha: hashedPassword, // Envia a senha hasheada
        ProfilePic,
        typeAuth,
      })) as ApiResponse;
  
      console.log("Registration response", registerResponse);
  
    } catch (error) {
      yield put(loadFailure());
      console.error(error);
    }
  }
  


  export default all<ForkEffect<never>>([
    takeLatest(UserTypes.GET_USERS_REQUEST, getUsers),
    takeLatest(UserTypes.POST_USERS_REQUEST, postUsers),
  ]);
