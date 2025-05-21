"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import "../../app/globals.css";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "@/store";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loadUsersRequest, postUsersRequest } from "@/store/modules/users/actions";
import BackButton from "@/components/Backbutton";

interface IFormData {
  email: string;
  senha: string;
  csenha: string;
}

export default function Cadastro() {
  const router = useRouter();
  const [showSenha, setShowSenha] = useState(false);
  const [showCSenha, setShowCSenha] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<IFormData>();
  const users = useSelector((state: ApplicationState) => state?.Users.data);
  const dispatch = useDispatch()
  const password = watch("senha");

  useEffect(() => {
    dispatch(loadUsersRequest())
  }, [])

  const onsubmit = (data: IFormData) => {
    const exist = users.find((value) => value.email === data.email);
    if(exist) {
      toast.error('E-mail já cadastrado',
        {theme: "dark"}
      )
      return
    }
    dispatch(postUsersRequest({email: data.email, senha: data.senha, carrinho: [], favoritos: [], typeAuth: 'trad'}))
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fcf1ed]">
            <BackButton />
      
      <p className="absolute bottom-4 m-auto">
        Já tem cadastro?{" "}
        <a
          className="text-amber-700 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Faça login
        </a>
      </p>

      <div className="absolute top-3 p-4">
        <img src="assets/m&e.png" alt="melissa e evandro" />
      </div>

      <div className="flex flex-col items-start justify-center w-full max-w-xs p-4 mt-4 bg-white rounded-lg shadow-md">
        <h1 className="pt-2 py-4 text-2xl self-center">Cadastro</h1>
        <form onSubmit={handleSubmit(onsubmit)}>
          <label className="pl-2" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            name="email"
            type="email"
            className="w-full p-2 mb-2 border shadow-lg border-gray-300 rounded-lg"
          />

          <label className="pl-2" htmlFor="senha">
            Senha
          </label>
          <div className="relative w-full mb-2">
            <input
              {...register("senha")}
              name="senha"
              onChange={() => clearErrors()}
              type={showSenha ? "text" : "password"}
              className="w-full p-2 border shadow-lg border-gray-300 rounded-lg pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowSenha(!showSenha)}
            >
              {showSenha ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <label className="pl-2" htmlFor="csenha">
            Confirme sua senha
          </label>
          <div className="relative w-full mb-12">
            <input
              {...register("csenha", {
                validate: (value) =>
                  value === password || "As senhas não coincidem",
              })}
              onChange={() => clearErrors()}
              name="csenha"
              type={showCSenha ? "text" : "password"}
              className="w-full p-2 border shadow-lg border-gray-300 rounded-lg pr-10"
            />
            {errors.csenha && (
              <p className="absolute text-red-600 text-sm mt-1 pl-2">
                {errors.csenha.message}
              </p>
            )}

            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowCSenha(!showCSenha)}
            >
              {showCSenha ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-2 mb-10 shadow-lg text-white bg-amber-700 rounded-lg"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
