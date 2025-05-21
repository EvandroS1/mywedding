// components/SidebarCarrinho.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import FavItem from "../FavItem";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "@/store";
import { loadSideBarRequest } from "@/store/modules/sideBars/actions";

export default function Favoritos() {
  // const { data: session, status } = useSession();
  const { data: session } = useSession();
  const open = useSelector((state: ApplicationState) => state.SideBars.data);
  const dispatch = useDispatch();

  return (
    <>
      {/* Overlay + Sidebar */}
      <AnimatePresence>
        {open.favOpen && (
          <>
            {/* Fundo com efeito de glass */}
            <motion.div
              className="fixed h-full inset-0 bg-white/10 backdrop-blur-lg z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                dispatch(loadSideBarRequest({ cartOpen: false, favOpen: false }))
              }
            />

            {/* Sidebar animada */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-[80%] bg-white/10 backdrop-blur-md z-50 shadow-lg p-6 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: "-25%" }}
              exit={{ x: "-130%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Seus favoritos</h2>
                <button
                  onClick={() => 
                    dispatch(loadSideBarRequest({ cartOpen: false, favOpen: false }))
                  }
                  className="text-white"
                >
                  ✕
                </button>
              </div>

              {session ? (
                <div className="h-[90%] mb-24">
                  <FavItem />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src="/assets/noLoginFav.png"
                    alt="Imagem de perfil"
                    className="object-cover"
                  />
                  <div className="absolute bottom-6 m-auto z-50 w-[90%]  flex items-center justify-center">
                    <div className="flex w-full items-center justify-center  gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-black shadow-lg hover:bg-white/30 transition">
                      <img
                        src="/assets/nouser.png"
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
          </>
        )}
      </AnimatePresence>
    </>
  );
}
