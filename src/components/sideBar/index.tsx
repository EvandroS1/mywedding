// components/SidebarCarrinho.tsx
import { motion, AnimatePresence } from "framer-motion";

interface SidebarCarrinhoProps {
  setAberto: (aberto: boolean) => void;
  aberto: boolean;
}
export default function SidebarCarrinho({setAberto, aberto}: SidebarCarrinhoProps) {

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
              className="fixed top-0 right-0 h-full w-[60%] bg-white z-50 shadow-lg p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Seu Carrinho</h2>
                <button onClick={() => setAberto(false)} className="text-gray-600">
                  ✕
                </button>
              </div>
              {/* Conteúdo do carrinho aqui */}
              <p className="text-gray-500">Nenhum item adicionado ainda.</p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
