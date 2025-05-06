"use client";
import Card from "@/components/card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../app/globals.css";
// import { useSession } from "next-auth/react";
import { Heart, Home, ShoppingCart } from "@geist-ui/icons";
import { useEffect, useState } from "react";
import DropdownFiltro from "@/components/dropDown";
import { useRouter } from "next/navigation";
import ModalAnimado from "@/components/ModalAnimado";
import SidebarCarrinho from "@/components/sideBar";

interface Item {
  id: number;
  image: string;
  nome: string;
  valor: string;
  categoria: [string, string?, string?];
}

const Presentes = () => {
  const router = useRouter();
  const [item, setItem] = useState<Item[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [modalData, setModalData] = useState<Item | null>(null);
  const [aberto, setAberto] = useState(false);
  // const { data: session, status } = useSession();

  const itens: Item[] = [
    {
      id: 1,
      image: "/assets/wishlist/maquinaLavar.png",
      nome: "Maquina de lavar",
      valor: "$ 4.000",
      categoria: ["eletro"],
    },
    {
      id: 2,
      image: "/assets/wishlist/refrigerador.png",
      nome: "Geladeira",
      valor: "$ 4.000",
      categoria: ["eletro", "cozinha"],
    },
    {
      id: 3,
      image: "/assets/wishlist/lava-loucas.png",
      nome: "Lava Louças",
      valor: "$ 2.089",
      categoria: ["eletro", "cozinha"],
    },
    {
      id: 4,
      image: "/assets/wishlist/panelas.webp",
      nome: "Jogo de panela",
      valor: "$ 489,89",
      categoria: ["cozinha"],
    },
    {
      id: 5,
      image: "/assets/wishlist/arcondicionado.png",
      nome: "Ar-condicionado",
      valor: "$ 2.169",
      categoria: ["eletro"],
    },
    {
      id: 6,
      image: "/assets/wishlist/armario.webp",
      nome: "Armario cozinha",
      valor: "$ 2.169",
      categoria: ["cozinha"],
    },
    {
      id: 7,
      image: "/assets/wishlist/tv.webp",
      nome: "Tv Smart",
      valor: "$ 2.899",
      categoria: ["eletro", "sala"],
    },
    {
      id: 8,
      image: "/assets/wishlist/sofa.webp",
      nome: "Sofá 3 lugares",
      valor: "$ 3.200",
      categoria: ["sala"],
    },
    {
      id: 9,
      image: "/assets/wishlist/mesa.png",
      nome: "Mesa de jantar",
      valor: "$ 1.890",
      categoria: ["cozinha", "sala"],
    },
    {
      id: 10,
      image: "/assets/wishlist/microondas.png",
      nome: "Micro-ondas",
      valor: "$ 851,00",
      categoria: ["eletro", "cozinha"],
    },
    {
      id: 11,
      image: "/assets/wishlist/aspirados.png",
      nome: "Aspirador de pó",
      valor: "$ 359,00",
      categoria: ["utilidades"],
    },
    {
      id: 12,
      image: "/assets/wishlist/frigobar.png",
      nome: "Frigobar",
      valor: "$ 980,00",
      categoria: ["eletro", "cozinha"],
    },
    {
      id: 13,
      image: "/assets/wishlist/liquidificador.png",
      nome: "Liquidificador",
      valor: "$ 219,00",
      categoria: ["eletro", "cozinha"],
    },
    {
      id: 14,
      image: "/assets/wishlist/guarda-roupa.webp",
      nome: "Guarda-roupa",
      valor: "$ 2.590",
      categoria: ["quarto"],
    },
    {
      id: 15,
      image: "/assets/wishlist/abajur.webp",
      nome: "Abajur",
      valor: "$ 129,00",
      categoria: ["decoração", "quarto", "sala"],
    },
    {
      id: 16,
      image: "/assets/wishlist/processador.webp",
      nome: "Processador",
      valor: "$ 134,00",
      categoria: ["eletro", "cozinha"],
    },
    {
      id: 19,
      image: "/assets/wishlist/batedeira.png",
      nome: "Batedeira",
      valor: "$ 118,66",
      categoria: ["eletro", "cozinha"],
    },
    {
      id: 20,
      image: "/assets/wishlist/sanduicheira.png",
      nome: "Sanduicheira",
      valor: "$ 150,49",
      categoria: ["eletro", "cozinha"],
    },
    {
      id: 21,
      image: "/assets/wishlist/forno.png",
      nome: "Forno Elétrico",
      valor: "$ 460,58",
      categoria: ["eletro", "cozinha"],
    },
    {
      id: 22,
      image: "/assets/wishlist/triturador.webp",
      nome: "Triturador",
      valor: "$ 15,90",
      categoria: ["cozinha"],
    },
    {
      id: 23,
      image: "/assets/wishlist/pratos.webp",
      nome: "Jogo de pratos",
      valor: "$ 410,00",
      categoria: ["cozinha"],
    },
    {
      id: 24,
      image: "/assets/wishlist/copo.webp",
      nome: "Jogo de Copos",
      valor: "$ 99,90",
      categoria: ["cozinha"],
    },
    {
      id: 25,
      image: "/assets/wishlist/talher.png",
      nome: "Faqueiro em inox",
      valor: "$ 220,00",
      categoria: ["cozinha"],
    },
    {
      id: 27,
      image: "/assets/wishlist/pano.webp",
      nome: "Jogo de panos de prato",
      valor: "$ 47,90",
      categoria: ["cozinha"],
    },
    {
      id: 28,
      image: "/assets/wishlist/tupeware.webp",
      nome: "Jogo de Tupperware",
      valor: "$ 140,90",
      categoria: ["cozinha"],
    },
    {
      id: 29,
      image: "/assets/wishlist/tompero.webp",
      nome: "Jogo de Tempero",
      valor: "$ 290,90",
      categoria: ["cozinha"],
    },
    {
      id: 30,
      image: "/assets/wishlist/pote.webp",
      nome: "Jogo de Potes Herméticos",
      valor: "$ 257,90",
      categoria: ["cozinha"],
    },
    {
      id: 31,
      image: "/assets/wishlist/jogo_cama.webp",
      nome: "Jogo de cama",
      valor: "$ 161,70",
      categoria: ["quarto"],
    },
    {
      id: 32,
      image: "/assets/wishlist/toalha.webp",
      nome: "Jogo de toalha",
      valor: "$ 99,99",
      categoria: ["quarto"],
    },
    {
      id: 33,
      image: "/assets/wishlist/edredon.webp",
      nome: "Edredon Queen",
      valor: "$ 189,90",
      categoria: ["quarto"],
    },
    {
      id: 34,
      image: "/assets/wishlist/lua.jpeg",
      nome: "Ajudar na lua de mel",
      valor: "$ 480,00",
      categoria: ["variado"],
    },
    {
      id: 35,
      image: "/assets/wishlist/cortina.webp",
      nome: "Cortina Blackout",
      valor: "$ 129,90",
      categoria: ["sala", "quarto"],
    },
    {
      id: 36,
      image: "/assets/wishlist/spa.jpeg",
      nome: "Vale Spa para Noiva",
      valor: "$ 329,90",
      categoria: ["variado"],
    },
    {
      id: 37,
      image: "/assets/wishlist/night.webp",
      nome: "Vale Night para os Noivos",
      valor: "$ 357,90",
      categoria: ["variado"],
    },
    {
      id: 38,
      image: "/assets/wishlist/play.webp",
      nome: "PlayStation 5 para o Noivo",
      valor: "$ 3.149,10",
      categoria: ["variado", "sala"],
    },
    {
      id: 39,
      image: "/assets/wishlist/chaleira.webp",
      nome: "Chaleira elétrica",
      valor: "$ 41,90",
      categoria: ["cozinha"],
    },
    {
      id: 40,
      image: "/assets/wishlist/cobertor.webp",
      nome: "Cobertor",
      valor: "$ 146,70",
      categoria: ["quarto"],
    },
    {
      id: 41,
      image: "/assets/wishlist/cobreLeito.png",
      nome: "Cobre Leito",
      valor: "$ 320,00",
      categoria: ["quarto"],
    },
  ];

  useEffect(() => {
    const savedFilter = localStorage.getItem("filter");
    if (savedFilter) {
      setItem(itens.filter((value) => value.categoria.includes(savedFilter)));
      setFiltro(savedFilter);
    } else {
      setItem(itens);
    }
  }, []);

  const handleClick = (valor: string) => {
    console.log("valor", valor);
    setFiltro(valor);
    localStorage.setItem("filter", valor);
    setItem(itens.filter((value) => value.categoria.includes(valor)));
  };
  useEffect(() => {
    console.log("itens", item);
  }, [item]);

  const reset = () => {
    setItem(itens);
    setFiltro("");
    localStorage.removeItem("filter");
  };

  return (
    <div className="font-extrabold text-xl bg-[#fcf1ed] ">
      <ModalAnimado
        show={modalData !== null}
        onClose={() => setModalData(null)}
        image={modalData?.image || ""}
        nome={modalData?.nome || ""}
        valor={modalData?.valor || ""}
        onAddToCart={() => {
          setModalData(null);
          setAberto(true);
        }}
      />
      <SidebarCarrinho aberto={aberto} setAberto={setAberto} />

      <div className="fixed gap-5 flex justify-center z-40 border-amber-700 border shadow-sm items-center bottom-6 h-20 w-10/12 bg-white/30 backdrop-blur-md left-1/2 -translate-x-1/2 rounded-2xl">
        <Home size={30} color="black" onClick={() => router.push("/")} />
        <ShoppingCart size={40} color="black" onClick={() => setAberto(true)} />
        <Heart size={30} color="black" />
      </div>
      <div className="text-center p-4">
        <img src="assets/m&e.png" alt="melissa e evandro" />
        <h1 className="pt-2 text-2xl">Lista de presentes</h1>
      </div>
      <DropdownFiltro filtro={filtro} reset={reset} handleClick={handleClick} />
      <div className="grid justify-center items-center grid-cols-2 gap-4 p-4 mb-20 mx-auto">
        {item.map((item) => (
          <div key={item.id} onClick={() => setModalData(item)}>
            <Card image={item.image} nome={item.nome} valor={item.valor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Presentes;
