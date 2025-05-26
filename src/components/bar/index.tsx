"use client";

import { useRouter } from "next/navigation";

type BarProps = {
  placeHolder: string;
  link: string;
};

export default function Bar({ placeHolder, link }: BarProps) {
  const router = useRouter();

  return (
    <div className='flex justify-center border text-center items-center h-16  rounded-2xl shadow-xl w-full' onClick={() => router.push(link)}>
    <p className="m-0">{placeHolder}</p>
  </div>
  );
}
