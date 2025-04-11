import Image from "next/image";
import "./globals.css";
import Bar from "@/components/bar";

export default function Home() {
  return (
    <>
      <Image src={"/assets/back.png"} fill={true} alt="convite"/>
    <div className="flex flex-col relative w-full h-screen pb-7 justify-end z-10 text-gray-800 px-20">
      {Bar("O nosso dia", "/dia")}
      {Bar("O nosso lugar", "/local")}
      {Bar("Nossa lista de presentes", "/presentes")}
      {Bar("Confirme sua presença", "/presenca")}
    </div>
    </>
  );
}
