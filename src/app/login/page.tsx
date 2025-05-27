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
import { AnimatePresence, motion } from "framer-motion";

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


const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.8,
  }),
};

export default function Login() {
  const [showSenha, setShowSenha] = useState(false);
  const [firstAcess, setFirstAcess] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const canGoPrev = stepIndex > 0;
  const canGoNext = stepIndex < steps.length - 1;
  const handleNext = () => {
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };
  const handlePrev = () => {
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  };
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
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md flex items-center justify-center px-4">
          <div className="relative bg-white p-6 rounded-lg shadow-lg h-64 max-w-md w-full overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={stepIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center  h-full justify-between text-center"
              >
                <div>
                <h2 className="text-2xl font-bold mb-2">
                  {steps[stepIndex].title}
                </h2>
                <p className="mt-4">{steps[stepIndex].description}</p>
                </div>

                <div className={`w-full flex items-center ${stepIndex === 0 ? "justify-center" : "justify-between"}`}>
                  {stepIndex != 0 ? <button
                    onClick={handlePrev}
                    disabled={!canGoPrev}
                    className={`px-4 py-2 rounded-lg ${
                      canGoPrev
                        ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Voltar
                  </button>: null}
                  {canGoNext ? (
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
                    >
                      Continuar
                    </button>
                  ) : (
                    <button onClick={() => setFirstAcess(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Começar
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
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
