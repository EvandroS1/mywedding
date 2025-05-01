// components/ModalAnimado.tsx
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  image: string;
  nome: string;
  valor: string;
}

const ModalAnimado = ({ show, onClose, image, nome, valor }: ModalProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 w-10/12 max-w-md"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no card
          >
            <img src={image} alt={nome} className="rounded-xl w-full h-auto mb-4" />
            <h2 className="text-xl font-bold">{nome}</h2>
            <p className="text-lg">{valor}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalAnimado;
