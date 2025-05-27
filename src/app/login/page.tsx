"use client";
import { signIn } from "next-auth/react";
import "../../app/globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { loadUsersRequest } from "@/store/modules/users/actions";
import { useDispatch } from "react-redux";
import BackButton from "@/components/Backbutton";
import Notices from "@/components/Notices";

const steps = [
  {
    title: "Um toque pessoal",
    description:
      "Eu, Evandro (o noivo), desenvolvi esse site especialmente para nosso casamento. Caso tenha qualquer dúvida ou dificuldade, pode me chamar sem problema!",
  },
  {
    title: "Como funciona?",
    description:
      "Aqui você pode escolher um presente para nos dar. Ao invés de receber o item diretamente, nós — os noivos — receberemos o valor e escolheremos quando e como utilizá-lo. Isso evita trocas ou duplicidade de presentes!",
  },
  {
    title: "Pagamento 100% seguro",
    description:
      "Todo o processo de pagamento é feito via Mercado Pago, uma plataforma confiável e segura. Você pode pagar com Pix, cartão de crédito ou boleto.",
  },
  {
    title: "Sistema de login!",
    description:
      `Para oferecer a você uma experiência completa, este site conta com um sistema de login. Assim, você poderá nos presentear, favoritar itens e acompanhar os presentes dados aos noivos. `,
  }
];



export default function Login() {
  const [showSenha, setShowSenha] = useState(false);
  const [firstAcess, setFirstAcess] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

 
 
  useEffect(() => {
    dispatch(loadUsersRequest());
    const firstAccess = localStorage.getItem("firstAccess");
    if (firstAccess === null) {
      setFirstAcess(true);
      localStorage.setItem("firstAccess", "false");
    }
  }, []);

  const handleSignInWithCredentials = async () => {
    const result = await signIn("credentials", {
      redirect: false, // Não redireciona automaticamente, vamos lidar com o resultado
      email: email,
      password: senha,
    });

    if (result?.error) {
      setError("E-mail ou senha inválida"); // Exibe a mensagem de erro retornada pelo authorize
    } else {
      // Login bem-sucedido, redirecionar para a página desejada
      router.push("/sections");
    }
  };

  return (
    <>
      {firstAcess ? (
        <Notices steps={steps} setFirstAcess={() => setFirstAcess(false)}/>
      ) : null}
      <div className="flex flex-col items-center justify-center h-screen bg-[#fcf1ed]">
        <BackButton />

        <p className="absolute bottom-4 m-auto">
          Ainda não tem cadastro?{" "}
          <a
            className="text-amber-700"
            onClick={() => router.push("/cadastro")}
          >
            Crie uma conta
          </a>
        </p>
        <div className="absolute top-3 p-4">
          <img src="assets/m&e.png" alt="melissa e evandro" />
        </div>
        <div className="relative flex flex-col items-center justify-center w-full max-w-xs p-4 mt-4 bg-white rounded-lg shadow-md">
          <h1 className="pt-2 py-4 text-2xl">Lista de presentes</h1>
          {error && (
            <p className="absolute z-10 top-16 text-red-500">{error}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border shadow-lg border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          <div className="relative w-full mb-12">
            <input
              name="senha"
              type={showSenha ? "text" : "password"}
              className="w-full p-2 border shadow-lg border-gray-300 rounded-lg pr-10"
              placeholder="Senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setError("");
              }}
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
          <button
            className="w-full p-2 mb-4 shadow-lg text-white bg-amber-700 rounded-lg"
            onClick={handleSignInWithCredentials}
          >
            Entrar
          </button>
          <button
            className="flex justify-center mb-2 items-center p-4 gap-7 h-10 w-full shadow-lg border-gray rounded-lg border"
            onClick={() => signIn("google")}
          >
            <Image
              width={20}
              height={20}
              src="/assets/google.png"
              alt="Google logo"
            />
            <p className="m-0">Continue com Google</p>
          </button>
        </div>
      </div>
    </>
  );
}
