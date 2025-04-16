import Container from "@/components/container";
import "../../app/globals.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Plus } from "@geist-ui/icons";

const Presenca = () => {

  interface IConvidado {
    nome: [];
  }

  const {
    register,
    handleSubmit,

    formState: {  },
  } = useForm<IConvidado>({
    criteriaMode: 'all',
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };


  async function onSubmit(data: IConvidado) {
    console.log(data);
    try {const res = await fetch("/api/convidados", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);} catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <Container picture="/assets/alianca.jpg">
        <div className="h-full flex flex-col justify-space-between items-center bg-white rounded-t-3xl px-6 py-4 z-4">
          <Image src={"/assets/logo.png"} alt="logo" width={200} height={200}/>
            <h1 className="text-2xl font-semibold mb-4">Confirme sua presença</h1>
                <div className="text-center py-10 px-4 bg- flex flex-col justify-center items-center rounded-xl shadow-2xl max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 w-full">
              <input type="text" className="border-solid px-4 border rounded-lg border-[#c89857] shadow-xl" {...register('nome')} placeholder="Digite seu nome" onChange={handleSearch} />
              <Plus color="#c89857"/>
              <button type="submit" className="h-10 shadow-xl rounded-lg text-white hover:bg-green-700 w-full bg-green-600">Confirmar</button>
            </div>
          </form>
          </div>
        </div>

    </Container>
  );
};

export default Presenca;
