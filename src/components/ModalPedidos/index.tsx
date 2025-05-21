// components/ModalPedidos.tsx
'use client';

import React from 'react';
import { X } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store';

interface CartItem {
  id: number;
  nome: string;
  image: string;
  valor: number;
  qtde: number;
  desc?: string;
}

interface Pedido {
  payer: {
    id: string;
    email?: string;
    first_name?: string;
    last_name?: string;
  };
  transaction_amount: number;
  status: string;
  cart: CartItem[];
}

interface ModalPedidosProps {
  show: boolean;
  onClose: () => void;
  pedidos: Pedido[];
}

export default function ModalPedidos({
  show,
  onClose,
  pedidos
}: ModalPedidosProps) {
  const user = useSelector((state: ApplicationState) => state.User.data)
  console.log('user', user)
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-11/12 max-w-3xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <X
              size={24}
              className="absolute top-4 right-4 cursor-pointer text-gray-800 hover:text-gray-600 transition"
              onClick={onClose}
            />

            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Meus Pedidos
            </h2>

            {pedidos.length === 0 ? (
              <p className="text-center text-gray-300">Nenhum pedido encontrado.</p>
            ) : (
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {pedidos.map((pedido, idx) => (
                  <div
                    key={idx}
                    className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-700">
                        Pedido #{idx + 1}
                      </span>
                      <span
                        className={`px-2 py-1 text-sm font-semibold rounded ${
                          pedido.status === 'approved'
                            ? 'bg-green-200 text-green-800'
                            : pedido.status === 'pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {pedido.status === "approved" ? "Aprovado" : "Pendente"}
                      </span>
                    </div>

                    <div className="mb-2 text-gray-700">
                      <span className="font-semibold">Total:</span>{" "}
                      R${pedido.transaction_amount.toFixed(2)}
                    </div>

                    <ul className="space-y-2 pl-0">
                      {pedido.cart.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center bg-white/70 backdrop-blur-sm border border-gray-100 rounded-lg p-2"
                        >
                          <img
                            src={item.image}
                            alt={item.nome}
                            className="w-12 h-12 rounded-md object-cover mr-3"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.nome}</p>
                            <p className="text-sm text-gray-600">
                              {item.qtde} × R${item.valor.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-800">
                            R${(item.valor * item.qtde).toFixed(2)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
