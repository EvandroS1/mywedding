"use client";
import Container from "@/components/container";
import "../../app/globals.css";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { MinusCircle, PlusCircle } from "@geist-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

interface IConvidado {
  nome: string;
  confirmado: boolean;
}

interface IFormData {
  convidados: IConvidado[];
}

const Presenca = () => {
  const [convidados, setConvidados] = useState<IConvidado[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // const [filtro, setFiltro] = useState<string>("");
  const [sugestoes, setSugestoes] = useState<string[]>([]);

  const getConvidados = async () => {
    try {
      const response = await fetch(
        "https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/nome"
      );
      const data = await response.json();
      setConvidados(data);
    } catch (error) {
      console.error("Error fetching convidados:", error);
    }
  };

  useEffect(() => {
    getConvidados();
  }, []);

  const { register, control, handleSubmit, setValue } = useForm<IFormData>({
    defaultValues: {
      convidados: [{ nome: "", confirmado: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "convidados",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
    const valor = e.target.value;
    setActiveIndex(index);  

    if (valor.length > 0) {
      const resultados = convidados
        .filter((convidado: IConvidado) =>
          convidado.nome?.toLowerCase().startsWith(valor.toLowerCase())
        )
        .map((convidado: IConvidado) => convidado.nome);

      setSugestoes(resultados);
    } else {
      setSugestoes([]);
    }
  };

  const handleSelectSugestao = (nome: string, index: number) => {
    setValue(`convidados.${index}.nome`, nome);
    setSugestoes([]);
  };

  const onSubmit = async (data: IFormData) => {
    try {
      for (const convidado of data.convidados) {
        convidado.confirmado = true;
        await fetch(
          "https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/nome",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(convidado),
          }
        );
      }
      toast.success("Confirmação enviada com sucesso!", { theme: "colored" });
      remove([...Array(fields.length - 1).keys()].map(i => i + 1));
      setValue("convidados.0.nome", "");

      // setValue(`convidado.nome`, nome);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ops... aconteceu algum erro", { theme: "dark" });
    }
  };

  return (
    <Container picture="/assets/alianca.jpg">
      <div className="h-full flex flex-col justify-space-between items-center bg-white rounded-t-3xl px-6 py-4 z-4">
        <Image src={"/assets/logo.png"} alt="logo" width={200} height={200} />
        <h1 className="text-2xl font-semibold mb-4">Confirme sua presença</h1>

        <div className="text-center py-10 px-4 flex flex-col justify-start items-center rounded-xl shadow-2xl max-w-md max-h-72 overflow-auto mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">

            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2 relative">
                <input
                  type="text"
                  className="border-solid px-4 py-2 border rounded-lg border-[#c89857] shadow-xl"
                  {...register(`convidados.${index}.nome`, { required: true })}
                  placeholder="Digite o nome"
                  onFocus={() => setActiveIndex(index)} 
                  onChange={(e) => handleSearch(e, index)}
                />

                {activeIndex === index && sugestoes.length > 0 && (
                  <ul className="absolute top-12 w-full max-h-32 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {sugestoes.map((nome, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleSelectSugestao(nome, index)}
                        className="p-2 cursor-pointer hover:bg-[#f1e7dc] border-b last:border-b-0"
                      >
                        {nome}
                      </li>
                    ))}
                  </ul>
                )}
                {index > 0 ? <MinusCircle size={20} color="red" className="absolute right-1 top-3" onClick={() => remove(index)}/> : null }
                
              </div>
            ))}

              <PlusCircle size={20} className="cursor-pointer" onClick={() => append({ nome: "", confirmado: false })}/>

            <button
              type="submit"
              className="h-10 shadow-xl rounded-lg text-white hover:bg-green-700 w-full bg-green-600"
            >
              Confirmar Presenças
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default Presenca;
