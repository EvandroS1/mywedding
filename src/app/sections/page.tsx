"use client";
import "../../app/globals.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const categorias = [
  { nome: "todos", img: "/assets/all.png", filtro: "todos" },
  { nome: "Eletrodomésticos", img: "/assets/wishlist/eletro.png", filtro: "eletro" },
  { nome: "Quarto", img: "/assets/wishlist/quarto.png", filtro: "quarto" },
  { nome: "Cozinha", img: "/assets/wishlist/cozinha.webp", filtro: "cozinha" },
  { nome: "Sala", img: "/assets/wishlist/sala.png", filtro: "sala" },
  { nome: "Variados", img: "/assets/logo.png", filtro: "variado" },
];

const Sectionss = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log('session', session)

  const handleClick = (filtro: string) => {
    localStorage.setItem("filter", filtro);
    router.push(`/presentes`);
  };

  if (status === "loading") {
    return <p className="text-center py-20">Carregando sessão...</p>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#fcf1ed] text-black px-4 py-20 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-12">Seções</h1>
        <p className="text-lg">Você precisa estar logado para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf1ed] text-black px-4 py-20 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-12">Seções</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categorias.map(({ nome, img, filtro }) => (
          <div
            key={filtro}
            onClick={() => handleClick(filtro)}
            className="cursor-pointer transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="rounded-2xl bg-white/30 backdrop-blur-md border border-white/30 shadow-lg p-4 h-40 w-40 flex items-center justify-center mx-auto">
              <img
                src={img}
                alt={nome}
                className="h-24 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="mt-2 text-center font-bold text-lg">{nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sectionss;
