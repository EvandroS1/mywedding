"use client";
import Image from "next/image";
// import "@app/globals.css";
import Bar from "@/components/bar";
import { toast } from "react-toastify";

export default function Home() {

  const handleClick = () => {
    console.log('foi')
    toast.warning("Confirmado com sucesso", {
      theme: "colored",
    });
  };
  return (
    <div className="w-full h-screen relative">
      <Image src={"/assets/back.png"} fill={true} alt="convite"/>
    <div className="flex flex-col relative w-full h-screen justify-end z-10 pb-32 text-gray-800 px-20">
      <Bar placeHolder="O nosso dia" link="/dia"/>
      <button onClick={handleClick} 
        className="p-2 bg-blue-500 h-20 text-white rounded"></button>
      <Bar placeHolder="O nosso lugar" link="/local"/>
      <Bar placeHolder="Nossa lista de presentes" link="/presentes"/>
      <Bar placeHolder="Confirme sua presença" link="/presenca"/>
    </div>
    </div>
  );
}
