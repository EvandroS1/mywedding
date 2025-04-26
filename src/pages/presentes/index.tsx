import Card from "@/components/card";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../app/globals.css";
import { Heart, Home, ShoppingCart } from "@geist-ui/icons";
import { useEffect, useState } from "react";
// import { set } from "react-hook-form";

interface Item {
  id: number;
  image: string;
  nome: string;
  valor: string;
  categoria: string;
}


const Presentes = () => {
  const [item, setItem] = useState<Item[]>([])
  const itens: Item[] = [
    {
      id: 1,
      image: "/assets/wishlist/maquinaLavar.png",
      nome: "Maquina de lavar",
      valor: "$ 4.000",
      categoria: "eletro",
    },
    {
      id: 2,
      image: "/assets/wishlist/refrigerador.png",
      nome: "Geladeira",
      valor: "$ 4.000",
      categoria: "eletro",
    },
    {
      id: 3,
      image: "/assets/wishlist/lava-loucas.png",
      nome: "Lava Louças",
      valor: "$ 2.089",
      categoria: "eletro",
    },
    {
      id: 4,
      image: "/assets/wishlist/panelas.webp",
      nome: "Jogo de panela",
      valor: "$ 489,89",
      categoria: "cozinha",
    },
    {
      id: 5,
      image: "/assets/wishlist/arcondicionado.png",
      nome: "Ar-condicionado",
      valor: "$ 2.169",
      categoria: "Eletrodomésticos",
    },
    {
      id: 6,
      image: "/assets/wishlist/armario.webp",
      nome: "Armario cozinha",
      valor: "$ 2.169",
      categoria: "cozinha",
    },
    {
      id: 7,
      image: "/assets/wishlist/tv.webp",
      nome: "Tv Smart",
      valor: "$ 2.899",
      categoria: "eletro",
    },
    {
      id: 8,
      image: "/assets/wishlist/sofa.webp",
      nome: "Sofá 3 lugares",
      valor: "$ 3.200",
      categoria: "sala",
    },
    {
      id: 9,
      image: "/assets/wishlist/mesa.png",
      nome: "Mesa de jantar",
      valor: "$ 1.890",
      categoria: "cozinha",
    },
    {
      id: 10,
      image: "/assets/wishlist/microondas.png",
      nome: "Micro-ondas",
      valor: "$ 851",
      categoria: "eletro",
    },
    {
      id: 11,
      image: "/assets/wishlist/aspirados.png",
      nome: "Aspirador de pó",
      valor: "$ 359",
      categoria: "utilidades",
    },
    {
      id: 12,
      image: "/assets/wishlist/frigobar.png",
      nome: "Frigobar",
      valor: "$ 980",
      categoria: "cozinha",
    },
    {
      id: 13,
      image: "/assets/wishlist/liquidificador.png",
      nome: "Liquidificador",
      valor: "$ 219",
      categoria: "eletro",
    },
    {
      id: 14,
      image: "/assets/wishlist/guarda-roupa.webp",
      nome: "Guarda-roupa",
      valor: "$ 2.590",
      categoria: "quarto",
    },
    {
      id: 15,
      image: "/assets/wishlist/abajur.webp",
      nome: "Abajur",
      valor: "$ 129",
      categoria: "decoração",
    },
    {
      id: 16,
      image: "/assets/wishlist/processador.webp",
      nome: "processador",
      valor: "$ 129",
      categoria: "eletro",
    },
    {
      id: 17,
      image: "/assets/wishlist/honda.webp",
      nome: "Honda Civic coupe 95",
      valor: "$ 35.900",
      categoria: "variado",
    },
    {
      id: 18,
      image: "/assets/wishlist/gol.jpg",
      nome: "Gol g2 97",
      valor: "$ 17.900",
      categoria: "variado",
    },
    {
      id: 19,
      image: "/assets/wishlist/batedeira.png",
      nome: "Batedeira",
      valor: "$ 118,66",
      categoria: "eletro",
    },
    {
      id: 20,
      image: "/assets/wishlist/sanduicheira.png",
      nome: "Batedeira",
      valor: "$ 150,49",
      categoria: "eletro",
    },
    {
      id: 21,
      image: "/assets/wishlist/forno.png",
      nome: "Forno Eletrico",
      valor: "$ 460,58",
      categoria: "eletro",
    },
    {
      id: 22,
      image: "/assets/wishlist/triturador.webp",
      nome: "Triturador",
      valor: "$ 15,90",
      categoria: "cozinha",
    },
    {
      id: 23,
      image: "/assets/wishlist/pratos.webp",
      nome: "Jogo de pratos",
      valor: "$ 410,00",
      categoria: "cozinha",
    },
    {
      id: 24,
      image: "/assets/wishlist/copo.webp",
      nome: "Jogo de Copos",
      valor: "$ 99,90",
      categoria: "cozinha",
    },
  ]

  useEffect(() => {
    setItem(itens)
  },[])
  
  useEffect(() => {
    console.log(item)
  },[item])

  return (
    <div className="font-sans">
      <div
      className="fixed gap-5 flex justify-center items-center bottom-6 h-20 w-10/12 bg-red-600 bg-opacity-80 left-1/2 -translate-x-1/2 rounded-2xl"
      >
        <Home size={30} />
        <ShoppingCart size={40}/>
        <Heart size={30} />

      </div>
      <div className="text-center py-5">
        <h1>Lista de presene dos noivos</h1>
      </div>
      <div className="flex gap-2 px-2 pb-4 w-full no-scrollbar overflow-auto justify-start items-start">
      <button onClick={() => setItem(itens)} className="btn btn-success">All</button>
        <button onClick={() => setItem(itens.filter(value => value.categoria == 'eletro'))}  className="btn btn-danger text-nowrap">
          Eletrodomésticos
        </button >
        <button onClick={() => setItem(itens.filter(value => value.categoria == 'cama'))} className="btn btn-danger text-nowrap">
          Cama posta
        </button>
        <button onClick={() => setItem(itens.filter(value => value.categoria == 'lua'))} className="btn btn-danger text-nowrap">
          Lua de mel
        </button>
        <button onClick={() => setItem(itens.filter(value => value.categoria == 'cozinha'))} className="btn btn-danger text-nowrap">
          cozinha
        </button>
        <button onClick={() => setItem(itens.filter(value => value.categoria == 'sala'))} className="btn btn-danger text-nowrap">
          sala
        </button>
        <button onClick={() => setItem(itens.filter(value => value.categoria == 'variado'))} className="btn btn-danger text-nowrap">
          Variados
        </button>
      </div>
      <div className="grid justify-center items-center grid-cols-2 gap-4 p-4 mb-20 mx-auto">
        {item.map((item) => 
        <Card image={item.image} nome={item.nome} valor={item.valor} key={item.id} />)}
      </div>
    </div>
  );
};

export default Presentes;
