'use client';

import React, { useEffect } from 'react';
import { X } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import { GetRecebidosRequest } from '@/store/modules/recebidos/actions';

interface ModalRecebidosProps {
  show: boolean;
  onClose: () => void;
}

export default function ModalRecebidos({ show, onClose }: ModalRecebidosProps) {
  const recebidos = useSelector((state: ApplicationState) => state.Recebidos.data);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetRecebidosRequest())
    console.log('recebidos', recebidos)
  },[])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
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
              Presentes Recebidos
            </h2>

            {recebidos.length === 0 ? (
              <p className="text-center text-gray-300">Nenhum pedido encontrado.</p>
            ) : (
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {recebidos?.map((pedido, idx) => (
                  <div
                    key={idx}
                    className="bg-white/50   border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
                  >
                    <div className='flex gap-2 pb-2'>
                <img className="w-8 h-8 rounded-full object-cover" src={pedido.userImage} alt="" />
                      {pedido.nome}
                
                    </div>
                    <div className="mb-2 text-gray-700">
                      <span className="font-semibold">Total:</span>{" "}
                      R$ {pedido.transaction_amount ?? "??"}
                    </div>

                    <ul className="space-y-2 pl-0 max-h-[310px] overflow-auto ">
                      {pedido.items?.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center bg-white/70 backdrop-blur-sm border border-gray-100 rounded-lg p-2"
                        >
                          <img
                            src={item.image ?? "/assets/noImage.png"}
                            alt={item.title}
                            className="w-12 h-12 rounded-md object-cover mr-3"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.title}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} × R${item.unit_price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-800">
                            R${(item.unit_price * item.quantity).toFixed(2)}
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
