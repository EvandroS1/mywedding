// components/SidebarCarrinho.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CartItem from "../CartItem";
import { Button } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import CartItemProps from "../../../types/cart";
import formatValue from "@/functions/formatValue";
import { ApplicationState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { loadSideBarRequest } from "@/store/modules/sideBars/actions";
import { postPayRequest } from "@/store/modules/pay/actions";


export default function SidebarCarrinho() {
  const { data: session } = useSession();
  const [total, setTotal] = useState<number>(0);
  const cart = useSelector((state: ApplicationState) => state?.Cart.data);
  const open = useSelector((state: ApplicationState) => state.SideBars.data);
  const dispatch = useDispatch();
  const endOfCartRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const totalValue = cart?.reduce((acc: number, item: CartItemProps) => {
      return acc + item.valor * item.qtde;
    }, 0);
    setTotal(totalValue);

    setTimeout(() => {
      if (endOfCartRef.current) {
        endOfCartRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 500)
  }, [cart]);

  // useEffect(() => {
  //   console.log('total', total)
  //   console.log('cart', cart)
  // },[total])

  return (
    <>
      <AnimatePresence>
        {open.cartOpen && (
          <>
            {/* Fundo com efeito de glass */}
            <motion.div
              className="fixed inset-0 bg-white/10 backdrop-blur-lg z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                dispatch(
                  loadSideBarRequest({ cartOpen: false, favOpen: false })
                )
              }
            />

            <div className="fixed bottom-4 w-[90%] m-auto z-50 flex items-center justify-center"></div>
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
                  onClick={() => 
                  loadSideBarRequest({ cartOpen: false, favOpen: false })
                  }
                  className="text-gray-600"
                >
                  ✕
                </button>
              </div>

              {session ? (
                <div className="h-[90%]">
                  <CartItem />
                  <div ref={endOfCartRef} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src="/assets/noLoginCart.png"
                    alt="Imagem de perfil"
                    className="object-cover"
                  />
                  <div className="absolute bottom-6 m-auto z-50 w-[90%]  flex items-center justify-center">
                    <div className="flex w-full items-center justify-center  gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-black shadow-lg hover:bg-white/30 transition">
                      <img
                        src="assets/nouser.png"
                        alt="Imagem de perfil"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-semibold">
                        Faça <Link href="/login">login</Link>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.aside>
            {session ? (
              <motion.aside
                className="fixed bottom-0 flex justify-between items-center right-0 w-[80%] z-50 p-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex bg-white/10 backdrop-blur-md h-16 text-center w-full rounded-lg items-center justify-between px-2 shadow-md">
                  <span>Total: {formatValue(total)}</span>
                  <Button onClick={() => dispatch(postPayRequest())} className="w-40 h-12 rounded-lg text-white font-normal bg-amber-700">
                    Finalizar
                  </Button>
                </div>
              </motion.aside>
            ) : null}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
