import Card from "@/components/card";
import "../../app/globals.css";

const Local = () => {
  return (
    <> 
    <div className="text-center">
    <h1 >My wishlist</h1>
      </div>
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card image="/assets/wishlist/maquinaLavar.png" nome="Maquina de lavar" valor="4.000"/>
      <Card image="/assets/wishlist/refrigerador.png" nome="Geladeira" valor="4.000"/>
      <Card image="/assets/wishlist/lava-loucas.png" nome="Lava Louças" valor="2.089"/>
      <Card image="/assets/wishlist/panelas.webp" nome="Jogo de panela" valor="489,89"/>
      <Card image="/assets/wishlist/arcondicionado.png" nome="Ar-condicionado" valor="2.169"/>
      <Card image="/assets/wishlist/armario.webp" nome="Ar-condicionado" valor="2.169"/>




    </div>
    </>
  )
}

export default Local;