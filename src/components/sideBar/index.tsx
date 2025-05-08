// components/SidebarCarrinho.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CartItem from "../CartItem";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import IUsers from "../../../types/user";
import getUsers from "@/functions/getUsers";
import CartItemProps from "../../../types/cart";

interface SidebarCarrinhoProps {
  setAberto: (aberto: boolean) => void;
  aberto: boolean;
}
export default function SidebarCarrinho({
  setAberto,
  aberto,
}: SidebarCarrinhoProps) {
  const { data: session } = useSession();
  const [total, setTotal] = useState(0);
  // const [users, setusers] = useState<IUsers[]>([]);
  
  useEffect(() => {
    
    
      async function loadUsers() {
        const data: IUsers[] = await getUsers();
      
      const user = data.find((user) => user.email === session?.user?.email);
    const storedItems: CartItemProps[] = user?.carrinho ?? [];
    console.log('storedItems', storedItems)
    if (storedItems) {
      console.log('foieerew')
      // const cartItems = JSON.parse(storedItems);
      // console.log('cartItems', cartItems)
      const totalValue = storedItems.reduce((acc: number, item: CartItemProps) => {
        return acc + item.valor * item.qtde;
      }, 0);
      console.log('totalValue', totalValue)
      setTotal(totalValue);
    }
  }
  loadUsers()

  }, [session]);

  useEffect(() => {
    console.log('total', total)
  },[total])

  return (
    <>
      {/* Overlay + Sidebar */}
      <AnimatePresence>
        {aberto && (
          <>
            {/* Fundo com efeito de glass */}
            <motion.div
              className="fixed inset-0 bg-white/10 backdrop-blur-lg z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAberto(false)}
            />

            {/* Sidebar animada */}
            <div className="fixed bottom-4 w-[90%] m-auto z-50 flex items-center justify-center">

                  </div>
            <motion.aside
              className="fixed top-0 right-0 h-full w-[80%] bg-white/20 backdrop-blur-md z-40 shadow-lg p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Seu Carrinho</h2>
                <button
                  onClick={() => setAberto(false)}
                  className="text-gray-600"
                >
                  ✕
                </button>
              </div>

              {session ? (
                <div className="h-[90%]">
                  <CartItem />
                  
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <img
                      src='/assets/noLoginCart.png'
                      alt="Imagem de perfil"
                      className="object-cover"
                    />
                <div className="absolute bottom-6 m-auto z-50 w-[90%]  flex items-center justify-center">
                  <div className="flex w-full items-center justify-center  gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-black shadow-lg hover:bg-white/30 transition">
                    <img
                      src='assets/nouser.png'
                      alt="Imagem de perfil"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold">Faça <Link href="/login">login</Link></span>
                  </div>
                </div>
                </div>

              )}
            </motion.aside>
            {session ? 
            <motion.aside
              className="fixed bottom-0 flex justify-between items-center right-0 w-[80%] z-50 p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                  <span>Total: {total}</span>
                  <Button className='w-40 h-12 rounded-lg text-white font-normal bg-amber-700'>Finalizar</Button>

            </motion.aside>
            : null}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
