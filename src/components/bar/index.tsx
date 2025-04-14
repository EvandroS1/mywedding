import '../../pages/globals.css';
import { useRouter } from "next/router";

const Bar = (placeHolder: string, link: string) => {

  const router = useRouter();
return (
  <div className='flex justify-center text-center items-center h-12 rounded-2xl shadow-inner w-full'>
  <button onClick={() => router.push(link)}>
  <p>{placeHolder}</p>
  </button>
</div>
);
} 

export default Bar