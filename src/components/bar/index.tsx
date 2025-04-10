import Image from 'next/image';
import '../../pages/globals.css';
import { useRouter } from "next/router";

const Bar = (placeHolder: string, link: string) => {

  const router = useRouter();
return (
  <div className='flex justify-around items-center h-20 rounded-2xl shadow-xl w-full'>
  <p>{placeHolder}</p>
  <button onClick={() => router.push(link)}>
    <Image
    src={"/assets/arrow.png"}
    alt='Foto de melissa e Evandro'
    width={20}
    height={20}
    />
  </button>
</div>
);
} 

export default Bar