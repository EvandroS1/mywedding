import Image from "next/image";
// import "@app/globals.css";
import Bar from "@/components/bar";

export default function Home() {
  return (
    <div className="w-full h-screen relative">
      <Image src={"/assets/back.png"} fill={true} alt="convite"/>
    <div className="flex flex-col relative w-full h-screen pb-7 justify-end z-10 text-gray-800 px-20">
      <Bar placeHolder="O nosso dia" link="/dia"/>
      <Bar placeHolder="O nosso lugar" link="/local"/>
      <Bar placeHolder="Nossa lista de presentes" link="/presentes"/>
      <Bar placeHolder="Confirme sua presença" link="/presenca"/>
    </div>
    </div>
  );
}
