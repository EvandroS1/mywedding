import Card from "@/components/card";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../app/globals.css";
import { Heart, Home, ShoppingCart } from "@geist-ui/icons";



const Local = () => {
  return (
    <div className="font-sans">
      <div
      className="fixed gap-5 flex justify-center items-center bottom-6 h-20 w-10/12 bg-red-600 bg-opacity-80 left-1/2 -translate-x-1/2 rounded-2xl"
      >
        <Home size={30}/>
        <ShoppingCart size={40}/>
        <Heart size={30} />

      </div>
      <div className="text-center py-5">
        <h1>Lista de presene dos noivos</h1>
      </div>
      <div className="flex gap-2 px-2 pb-4 w-full overflow-auto justify-start items-start">
      <button className="btn btn-success">All</button>
        <button  className="btn btn-danger text-nowrap">
          Eletrodomésticos
        </button >
        <button className="btn btn-danger text-nowrap">
          Cama posta
        </button>
        <button className="btn btn-danger text-nowrap">
          Lua de mel
        </button>
        <button className="btn btn-danger text-nowrap">
          Variados
        </button>
      </div>
      <div className="grid justify-center items-center grid-cols-2 gap-4 p-4 mx-auto">
        <Card
          image="/assets/wishlist/maquinaLavar.png"
          nome="Maquina de lavar"
          valor="4.000"
        />
        <Card
          image="/assets/wishlist/refrigerador.png"
          nome="Geladeira"
          valor="4.000"
        />
        <Card
          image="/assets/wishlist/lava-loucas.png"
          nome="Lava Louças"
          valor="2.089"
        />
        <Card
          image="/assets/wishlist/panelas.webp"
          nome="Jogo de panela"
          valor="489,89"
        />
        <Card
          image="/assets/wishlist/arcondicionado.png"
          nome="Ar-condicionado"
          valor="2.169"
        />
        <Card
          image="/assets/wishlist/armario.webp"
          nome="Armario cozinha"
          valor="2.169"
        />
      </div>
    </div>
  );
};

export default Local;
