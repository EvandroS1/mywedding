"use client";

import { Heart } from "@geist-ui/icons";

type CardProps = {
  image: string;
  nome: string;
  valor: string;
};

export default function Card({ image, nome, valor }: CardProps) {
  return (
    <div className="place-self-center relative w-full flex flex-col overflow-hidden gap-2 max-w-48 shadow-2xl pb-4 max-h-72 rounded-2xl">
      <div className="absolute right-4 top-4 z-30 h-8 w-8 flex justify-center items-center rounded-lg bg-black/30 backdrop-blur-lg ">
        <Heart color="white" className=""/>
        </div>
      <div className="rounded-xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-2xl flex justify-center items-center w-full max-h-48 min-h-48 h-48 cursor-pointer">
        <img src={image} className="object-contain h-full max-h-48" alt="img" />
      </div>
      <div className="px-2">
        <p>{nome}</p>
        <p>{valor}</p>
      </div>
    </div>
  );
}
