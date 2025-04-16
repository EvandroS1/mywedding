"use client";
import Container from "@/components/container";
import "../../app/globals.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Plus } from "@geist-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const Presenca = () => {
  const [convidados, setConvidados] = useState([]);
  const [filtro, setFiltro] = useState<string>(""); // novo estado
  const [sugestoes, setSugestoes] = useState<string[]>([]); // novo estado

  interface IConvidado {
    nome: string;
    confirmado: boolean;
  }

  useEffect(() => {
    async function fetchConvidados() {
      try {
        const response = await fetch(
          "https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/nome"
        );
        const data = await response.json();
        setConvidados(data);
      } catch (error) {
        console.error("Error fetching convidados:", error);
      }
    }

    fetchConvidados();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm<IConvidado>({
    criteriaMode: "all",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFiltro(valor);

    if (valor.length > 0) {
      const resultados = convidados
        .filter((convidado: any) =>
          convidado.nome.toLowerCase().startsWith(valor.toLowerCase())
        )
        .map((convidado: any) => convidado.nome);

      setSugestoes(resultados);
    } else {
      setSugestoes([]);
    }
  };

  const handleSelectSugestao = (nome: string) => {
    setValue("nome", nome); // preenche o input do form
    setFiltro(nome);
    setSugestoes([]); // esconde o dropdown
  };

  async function onSubmit(data: IConvidado) {
    data.confirmado = true;

    try {
      await fetch(
        "https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/nome",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Confirmado com sucesso", {
        theme: "colored",
      });
      setFiltro(""); // limpa o campo
      setSugestoes([]); // limpa sugestões
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ops... aconteceu algum erro", {
        theme: "dark",
      });
    }
  }

  return (
    <Container picture="/assets/alianca.jpg">
      <div className="h-full flex flex-col justify-space-between items-center bg-white rounded-t-3xl px-6 py-4 z-4">
        <Image src={"/assets/logo.png"} alt="logo" width={200} height={200} />
        <h1 className="text-2xl font-semibold mb-4">Confirme sua presença</h1>
        <div className="text-center py-10 px-4 flex flex-col justify-center items-center rounded-xl shadow-2xl max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-4 w-full relative">
              <input
                type="text"
                value={filtro}
                className="border-solid px-4 py-2 border rounded-lg border-[#c89857] shadow-xl"
                {...register("nome", { required: true })}
                placeholder="Digite seu nome"
                onChange={handleSearch}
              />
              {sugestoes.length > 0 && (
                <ul className="absolute top-14 left-0 right-0 max-h-32 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {sugestoes.map((nome, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectSugestao(nome)}
                      className="p-2 cursor-pointer hover:bg-[#f1e7dc] border-b last:border-b-0"
                    >
                      {nome}
                    </li>
                  ))}
                </ul>
              )}

              <Plus color="#c89857" className="self-start" />
              <button
                type="submit"
                className="h-10 shadow-xl rounded-lg text-white hover:bg-green-700 w-full bg-green-600"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Presenca;
