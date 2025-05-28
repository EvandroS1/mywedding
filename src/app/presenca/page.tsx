"use client";
import Container from "@/components/container";
import "../../app/globals.css";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { MinusCircle, PlusCircle } from "@geist-ui/icons";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Loading } from "@geist-ui/react";
import BackButton from "@/components/Backbutton";
import { IConvidado } from "@/store/modules/convidados/types";
import Notices from "@/components/Notices";

interface IFormData {
  convidados: IConvidado[];
}

const steps = [
  {
    title: "Bem vindo(a) confirmação de presença",
    description:
      "Antes de tudo, queremos garantir que o grande dia ocorra de forma organizada e especial para todos. Por isso, criamos esta seção dedicada à confirmação de presença. Leia atentamente as instruções a seguir para garantir sua participação no casamento.",
  },
  {
    title: "Confirmação obrigatória",
    description:
      "A entrada no evento será estritamente permitida apenas para convidados que confirmarem presença. A assessoria está orientada a não permitir a entrada de quem não estiver na lista ou não confirmou a presença!",
  },
  {
    title: "Crianças",
    description:
      "Crianças de até 7 anos completos não precisam confirmar presença. Acima dessa idade, é necessário realizar a confirmação normalmente.",
  },
  {
    title: "Como confirmar presença?",
    description:
      "Digite seu nome na caixa de texto da página de confirmação. O sistema irá sugerir automaticamente os nomes da lista. Selecione o seu nome para confirmar.",
  },
  {
    title: "Nome não apareceu?",
    description:
      "Se ao digitar seu nome nenhum resultado aparecer, infelizmente significa que o nome não está na lista de convidados. Em caso de dúvidas, entre em contato diretamente com o noivo ou com a noiva.",
  },
];


const Presenca = () => {
  const [convidados, setConvidados] = useState<IConvidado[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pass, setPass] = useState<boolean>(false);
  const [firstAcess, setFirstAcess] = useState(true);
  const [sugestoes, setSugestoes] = useState<IConvidado[]>([]);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<IFormData>({
    defaultValues: {
      convidados: [{ nome: "", confirmado: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "convidados",
  });
  console.log("errors", errors);
  const getConvidados = async () => {
    try {
      const response = await fetch(
        "https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/nome"
      );
      const data = await response.json();
      setConvidados(data);
      console.log('data', data)
    } catch (error) {
      console.error("Error fetching convidados:", error);
    }
  };

  useEffect(() => {
    getConvidados();
  }, []);

  const inputValue = watch("convidados");
  useEffect(() => {
    console.log("inputValue", inputValue);
  }, [inputValue]);

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    clearErrors("convidados");
    const valor = e.target.value;
    setActiveIndex(index);
  
    const normalizar = (texto: string) =>
      texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
    if (valor.length > 0) {
      const valorNormalizado = normalizar(valor);
  
      const resultados = convidados.filter((convidado: IConvidado) =>
        normalizar(convidado.nome || "").startsWith(valorNormalizado)
      );
  
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
    console.log("foi");

    const indicesParaRemover: number[] = [];

    setLoading(true);

    for (let i = 0; i < data.convidados.length; i++) {
      const convidado = data.convidados[i];
      console.log("convidado", convidado);
      const foiConvidado = convidados.some(
        (c) => c.nome?.toLowerCase() === convidado.nome?.toLowerCase()
      );
      const convidadoOrig = convidados.find(
        (c) => c.nome.toLowerCase() === convidado.nome.toLowerCase()
      );
      console.log('convidadoOrig', convidadoOrig)

      if (!foiConvidado) {
        setError(`convidados.${i}`, {
          types: {
            required: "Esta pessoa não está na lista de convidados",
            value: i.toString(),
          },
        });
        toast.error(`${convidado.nome} não está na lista de convidados!`, {
          theme: "dark",
        });
        setValue(`convidados.${i}.nome`, "");
        continue;
      }
      console.log('convidado', convidado)
      console.log('convidados[i].confirmado', convidados[i].confirmado)

      if (convidadoOrig?.confirmado) {
        toast.error(`${convidado.nome} Já esta confirmado!`, {
          theme: "dark",
        });
        setValue(`convidados.${i}.nome`, "");
        continue;
      }

      try {
        const response = await fetch(
          `https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/nome/${convidadoOrig?.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...convidadoOrig, confirmado: true }),
          }
        );

        if (response.ok) {
          toast.success(`${convidado.nome} confirmado com sucesso!`, {
            theme: "colored",
          });
          indicesParaRemover.push(i);
          setPass(!pass);
        } else {
          toast.error(`Erro ao confirmar ${convidado.nome}.`, {
            theme: "dark",
          });
        }
      } catch (error) {
        console.error("Erro:", error);
        toast.error(`Erro de rede ao confirmar ${convidado.nome}.`, {
          theme: "dark",
        });
      }
    }

    // Remover de trás pra frente pra não bagunçar os índices
    indicesParaRemover.sort((a, b) => b - a).forEach((index) => remove(index));

    // Se sobrar só o primeiro campo vazio
    if (fields.length === 1) {
      setValue("convidados.0.nome", "");
    }
    console.log('fields.length', fields.length)
    

    setLoading(false);
    getConvidados();
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({ nome: "", confirmado: false });
    }
  },[fields])

  useEffect(() => {
    if (Array.isArray(errors.convidados) && errors.convidados.length >= 1) {
      for (const [index, convidado] of errors.convidados.entries()) {
        console.log("foierrors", index, convidado);
        setError(`convidados.${index}`, {
          types: {
            required: "teste",
            value: index.toString(),
          },
        });
      }
    }
  }, [errors.convidados, setError]);

  return (
    <>
      {firstAcess ? (
        <Notices steps={steps} setFirstAcess={() => setFirstAcess(false)} pular={true}/>
      ) : null}
      <div className="absolute top-4 right-4 p-2 bg-white/40 backdrop-blur-md rounded-lg">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-700"></div>
          <span>Já Confirmado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-700"></div>
          <span>Ainda não confirmou</span>
        </div>
      </div>
      <Container picture="/assets/alianca.jpg">
        <BackButton />

        <div className="h-full flex flex-col justify-space-between items-center bg-white rounded-t-3xl px-6 py-4 z-4">
          <Image src={"/assets/logo.png"} alt="logo" width={200} height={200} />
          <h1 className="text-2xl font-semibold mb-4">Confirme sua presença</h1>

          <div className="text-center py-10 px-4 flex flex-col justify-start items-center rounded-xl shadow-2xl max-w-md max-h-72 overflow-auto mx-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2 relative">
                  <input
                    type="text"
                    className="border-solid px-4 py-2 border rounded-lg border-[#c89857] shadow-xl"
                    {...register(`convidados.${index}.nome`, {
                      required: true,
                    })}
                    placeholder="Digite o nome"
                    style={
                      errors.convidados &&
                      errors.convidados?.[index]?.types?.value ===
                        index.toString()
                        ? { border: "1px solid #bf1650" }
                        : {}
                    }
                    onFocus={() => setActiveIndex(index)}
                    onChange={(e) => handleSearch(e, index)}
                  />
                  {activeIndex === index && sugestoes.length > 0 && (
                    <ul className="absolute pl-0 top-12 w-full max-h-32 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {sugestoes.map((convidado, idx) => (
                        <li
                          key={idx}
                          onClick={() =>
                            handleSelectSugestao(convidado.nome, index)
                          }
                          className="p-2 flex justify-between items-center px-4 cursor-pointer hover:bg-[#f1e7dc] border-b last:border-b-0"
                        >
                          {convidado.nome}
                          {convidado.confirmado ? (
                            <span className="h-2 w-2 rounded-full bg-green-700"></span>
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-red-700"></span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {index > 0 ? (
                    <MinusCircle
                      size={20}
                      color="red"
                      className="absolute right-1 top-3"
                      onClick={() => remove(index)}
                    />
                  ) : null}
                </div>
              ))}

              <PlusCircle
                size={20}
                className="cursor-pointer"
                onClick={() => append({ nome: "", confirmado: false })}
              />

              <button
                type="submit"
                className="h-10 shadow-xl rounded-lg flex justify-center items-center text-white hover:bg-green-700 w-full bg-green-600"
              >
                {loading ? <Loading color="white" /> : "Confirmar"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Presenca;
