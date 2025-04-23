"use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";

type CardProps = {
  image: string;
  // link?: string;
  nome: string;
  valor: string;
};

export default function Card({ image, nome, valor }: CardProps) {
  // const router = useRouter();

  return (
    <div className=" w-full flex flex-col gap-2 max-w-48 rounded-2xl text-white">
      <div className="rounded-xl bg-white flex justify-center items-center w-full max-h-48 h-48  cursor-pointer">
        <img src={image} className="object-contain h-full max-h-48" alt="img" />
      </div>
      <div className="px-2">
        <p>{nome}</p>
        <p>{valor}</p>
      </div>
    </div>
  );
}
