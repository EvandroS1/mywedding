"use client";
import Image from "next/image";
import Bar from "@/components/bar";
import { useSession } from "next-auth/react";


export default function Home() {
const { status } = useSession();
console.log('status', status)
  
  return (
    <div className="w-full h-screen relative">
      <Image src={"/assets/back.png"} fill={true} alt="convite"/>
    <div className="flex flex-col relative w-full h-screen justify-end z-10 pb-32 text-gray-800 px-20">
      <Bar placeHolder="O nosso dia" link="/dia"/>
      <Bar placeHolder="O nosso lugar" link="/local"/>
      <Bar placeHolder="Nossa lista de presentes" link={status === "authenticated" ? "/sections" : "/login"}/>
      <Bar placeHolder="Confirme sua presença" link="/presenca"/>
    </div>
    </div>
  );
}
