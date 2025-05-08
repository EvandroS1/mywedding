// components/ModalAnimado.tsx
import { Heart, ShoppingCart, X } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../app/globals.css";
import { Button } from "@headlessui/react";
import { useSession } from "next-auth/react";
import IUsers from "../../../types/user";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import getUsers from "@/functions/getUsers";
import CartItemProps from "../../../types/cart";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  image: string;
  nome: string;
  valor: number;
}

const ModalAnimado = ({
  show,
  onClose,
  image,
  nome,
  valor,
  onAddToCart,
}: ModalProps) => {
  const { data: session } = useSession();
  
  const router = useRouter();
  const [users, setusers] = useState<IUsers[]>([]);

const att = async () => {

  async function loadUsers() {
    const data: IUsers[] = await getUsers();
    setusers(data);
    
  }
  
  loadUsers()
}
  useEffect(() => {
    att()
  }, []);

  const updateCart = async () => {
    if (!session) {
      return toast.error(
        "Clique aqui e faça login para adicionar ao carrinho",
        { onClick: () => router.push("/login"), theme: "dark" }
      );
    }
  
    const carrinhoItem = {
      nome: nome,
      image: image,
      valor: valor,
      qtde: 1,
    };
  
    const user: IUsers | undefined = users?.find(
      (user: IUsers) => user?.email === session?.user?.email
    );
  
    if (!user) return;
  
    // Verifica se item já existe
    const existingItemIndex = user?.carrinho?.findIndex(
      (item: CartItemProps) => item.nome === carrinhoItem.nome
    );
  
    let updatedCart;

    console.log('existingItemIndex', existingItemIndex)
  
    if (existingItemIndex !== -1) {
      // Item já existe, incrementa qtde
      updatedCart = [...user.carrinho];
      updatedCart[existingItemIndex].qtde += 1;
    } else {
      // Item novo, adiciona ao carrinho
      updatedCart = [...user.carrinho, carrinhoItem];
    }
  
    try {
      await fetch(
        `https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/shopProfile/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ carrinho: updatedCart }),
        }
      );
      att()
      onAddToCart();
    } catch {
      console.error("Error updating cart");
    }
  };
  

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
            <Heart
              size={30}
              className="absolute left-4 top-4 z-10"
              color="black"
            />
            <X onClick={onClose} size={30} className="absolute right-4 top-4" />
            <img
              src={image}
              alt={nome}
              className="rounded-xl w-full h-fit max-h-[500px]"
            />
            <h2 className="text-xl font-bold">{nome}</h2>
            <p className="text-lg">{valor}</p>
            <div className="relative py-4">
              <ShoppingCart
                size={20}
                className="absolute left-4 top-8 z-10"
                color="black"
              />
              <Button
                type="button"
                onClick={() => updateCart()}
                className="bg-amber-700 w-full rounded-lg h-10"
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <ToastContainer />
    </AnimatePresence>
  );
};

export default ModalAnimado;
