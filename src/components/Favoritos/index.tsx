// components/SidebarCarrinho.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import FavItem from "../FavItem";

interface SidebarCarrinhoProps {
  setFavoritosAberto: (favoritosAberto: boolean) => void;
  favoritosAberto: boolean;
}
export default function Favoritos({
  setFavoritosAberto,
  favoritosAberto,
}: SidebarCarrinhoProps) {
  // const { data: session, status } = useSession();
  const { data: session } = useSession();

  return (
    <>
      {/* Overlay + Sidebar */}
      <AnimatePresence>
        {favoritosAberto && (
          <>
            {/* Fundo com efeito de glass */}
            <motion.div
              className="fixed inset-0 bg-white/10 backdrop-blur-lg z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFavoritosAberto(false)}
            />

            {/* Sidebar animada */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-[80%] bg-white z-50 shadow-lg p-6 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: "-25%" }}
              exit={{ x: "-130%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Seus favoritos</h2>
                <button
                  onClick={() => setFavoritosAberto(false)}
                  className="text-gray-600"
                >
                  ✕
                </button>
              </div>

              {session ? (
                <div>
                  <FavItem />
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
