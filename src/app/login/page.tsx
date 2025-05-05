"use client";
import { signIn } from 'next-auth/react';
import "../../app/globals.css";
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fcf1ed]">
      <p className="absolute bottom-4 m-auto">
        Ainda não tem cadastro? <a className="text-amber-700" href="">Crie uma conta</a>
      </p>
      <div className="absolute top-3 p-4">
        <img src="assets/m&e.png" alt="melissa e evandro" />
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-xs p-4 mt-4 bg-white rounded-lg shadow-md">
        <h1 className="pt-2 py-4 text-2xl">Lista de presentes</h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 mb-4 border shadow-lg border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-12 border shadow-lg border-gray-300 rounded-lg"
        />
        <button className="w-full p-2 mb-10 shadow-lg text-white bg-amber-700 rounded-lg">
          Entrar
        </button>
        <button
          className="flex justify-center mb-2 items-center p-4 gap-7 h-10 w-full shadow-lg border-gray rounded-lg border"
          onClick={() => signIn('google')}
        >
          <Image width={20} height={20} src="/assets/google.png" alt="Google logo" />
          <p>Continue com Google</p>
        </button>
      </div>
    </div>
  );
}