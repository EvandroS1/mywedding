// components/ModalAnimado.tsx
import { Heart, ShoppingCart, X } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../app/globals.css";
import { Button } from "@headlessui/react";

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
            className="bg-white relative max-h-[800px] rounded-2xl shadow-lg p-6 w-10/12 max-w-md"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no card
          >
            <Heart size={30} className="absolute left-4 top-4 z-10" color="black" />
            <X size={30} className="absolute right-4 top-4"/>
            <img src={image} alt={nome} className="rounded-xl w-full h-fit max-h-[500px]" />
            <h2 className="text-xl font-bold">{nome}</h2>
            <p className="text-lg">{valor}</p>
            <div className="relative py-4">
              <ShoppingCart size={20} className="absolute left-4 top-8 z-10" color="black" />
            <Button type="button" className="bg-amber-600 w-full rounded-lg h-10">Adicionar ao carrinho</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalAnimado;
