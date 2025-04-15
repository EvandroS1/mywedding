"use client";

import { useRouter } from "next/navigation";

type BarProps = {
  placeHolder: string;
  link: string;
};

export default function Bar({ placeHolder, link }: BarProps) {
  const router = useRouter();

  return (
    <div className='flex justify-center text-center items-center h-12 rounded-2xl shadow-xl w-full' onClick={() => router.push(link)}>
    <p>{placeHolder}</p>
  </div>
  );
}
