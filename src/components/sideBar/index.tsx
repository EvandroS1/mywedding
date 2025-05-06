// components/SidebarCarrinho.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import ProfileOptions from "../ProfileOptions";
import Link from "next/link";
import CartItem from "../CartItem";

interface SidebarCarrinhoProps {
  setAberto: (aberto: boolean) => void;
  aberto: boolean;
}
export default function SidebarCarrinho({
  setAberto,
  aberto,
}: SidebarCarrinhoProps) {
  // const { data: session, status } = useSession();
  const { data: session } = useSession();

  return (
    <>
      {/* Overlay + Sidebar */}
      <AnimatePresence>
        {aberto && (
          <>
            {/* Fundo com efeito de glass */}
            <motion.div
              className="fixed inset-0 bg-white/10 backdrop-blur-lg z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAberto(false)}
            />

            {/* Sidebar animada */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-[80%] bg-white z-50 shadow-lg p-6 overflow-y-auto"
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
                <div>
                  <CartItem />
                  <ProfileOptions />
                </div>
              ) : (
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
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
