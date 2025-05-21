// components/ModalAnimado.tsx
import { Heart, HeartFill, ShoppingCart, X } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../app/globals.css";
import { Button } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { CartItemProps } from "../../../types/cart";
import { useDispatch, useSelector } from "react-redux";
import { loadUpdateCartRequest } from "@/store/modules/loja/actions";
import { ApplicationState } from "@/store";
import { loadSideBarRequest } from "@/store/modules/sideBars/actions";
import { loadUpdateFavRequest } from "@/store/modules/favoritos/actions";
import { Fav } from "@/store/modules/favoritos/types";
import { Item } from "@/app/presentes/page";
import formatValue from "@/functions/formatValue";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  image: string;
  nome: string;
  valor: number;
  id: number;
  desc: string;
}

const ModalAnimado = ({
  show,
  onClose,
  image,
  nome,
  valor,
  id,
  desc,
  onAddToCart,
}: ModalProps) => {
  const { data: session } = useSession();
  // const [favItem, setFavItem] = useState()
  const router = useRouter();
  const usuario = useSelector((state: ApplicationState) => state?.User.data);
  const user = useSelector((state: ApplicationState) => state?.User.data);
  const fav = useSelector((state: ApplicationState) => state?.Favoritos.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('fav?.find((value) => value.nome === nome)', fav?.find((value) => value.nome === nome))
    console.log('nome', nome)
    console.log('fav', fav)
  }, [nome]);

  const updateCart = () => {
    if (!session) {
      return toast.error(
        "Clique aqui e faça login para adicionar ao carrinho",
        { onClick: () => router.push("/login"), theme: "dark" }
      );
    }

    const carrinhoItem = {
      id: id,
      nome: nome,
      image: image,
      valor: valor,
      qtde: 1,
      desc: desc
    };

    if (!usuario) return;

    // Verifica se item já existe
    const existingItemIndex = usuario?.carrinho?.findIndex(
      (item: CartItemProps) => item.nome === carrinhoItem.nome
    );

    let updatedCart: CartItemProps[];

    if (existingItemIndex !== -1) {
      // Item já existe, incrementa qtde
      updatedCart = [...usuario.carrinho];
      updatedCart = updatedCart.map((item, index) =>
        index === existingItemIndex ? { ...item, qtde: item.qtde + 1 } : item
      );
    } else {
      // Item novo, adiciona ao carrinho
      console.log("usuario.carrinho", usuario.carrinho);
      updatedCart = [...usuario.carrinho, carrinhoItem];
    }
    console.log("usuario?.id", updatedCart);

    dispatch(loadUpdateCartRequest(updatedCart, usuario.id, usuario?.email));
    dispatch(loadSideBarRequest({ cartOpen: true, favOpen: false }));

    onAddToCart();
  };

  const handleFav = async ({ nome, image, valor, id }: Item) => {
    // setFavItem()
    if (!session) {
      return toast.error(
        "Clique aqui e faça login para adicionar ao carrinho",
        { onClick: () => router.push("/login"), theme: "dark" }
      );
    }

    const favItem: Fav = {
      id: id,
      nome: nome,
      image: image,
      valor: valor,
    };

    // Verifica se item já existe
    const existingItemIndex = user?.favoritos?.findIndex(
      (item: Item) => item.nome === favItem.nome
    );

    let updatedFav: Fav[];

    if (existingItemIndex !== -1) {
      // Item já existe, incrementa qtde
      updatedFav = [...user?.favoritos];
      updatedFav.splice(existingItemIndex, 1);
    } else {
      // Item novo, adiciona ao favoritos
      updatedFav = [...user.favoritos, favItem];
    }

    dispatch(loadUpdateFavRequest(updatedFav, user?.id, user?.email));
    // if (!fill) dispatch(loadSideBarRequest({ cartOpen: false, favOpen: true }));
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
            {/* <Heart
              size={30}
              className="absolute left-4 top-4 z-10"
              color="black"
              onClick={() =>
                handleFav({
                  id: id,
                  nome: nome,
                  image: image,
                  valor: valor,
                  fill: false,
                })
              }
            /> */}
            {fav?.find((value) => value.nome === nome) === undefined ? (
                            <Heart
                              color="black"
                              className="absolute left-4 top-4 z-10 cursor-pointer"
                              onClick={() =>
                                handleFav({
                                  id: id,
                                  nome: nome,
                                  image: image,
                                  valor: valor,
                                  fill: false,
                                })
                              }
                            />
                          ) : (
                            <HeartFill
                              fill="true"
                              color="black"
                              className="absolute left-4 top-4 z-10 cursor-pointer"
                              onClick={() =>
                                handleFav({
                                  id: id,
                                  nome: nome,
                                  image: image,
                                  valor: valor,
                                  fill: true,
                                })
                              }
                            />
                          )}
            <X onClick={onClose} size={30} className="absolute right-4 top-4" />
            <img
              src={image}
              alt={nome}
              className="rounded-xl w-full h-fit mt-4 max-h-[500px]"
            />
            <h2 className="text-xl font-bold">{nome}</h2>
            <p className="text-lg">{formatValue(valor)}</p>
            <div className="relative py-4">
              
              <Button
                type="button"
                onClick={() => updateCart()}
                className="bg-amber-700 w-full rounded-lg h-10 flex justify-center items-center gap-2 text-white"
              >
                <ShoppingCart
                size={20}
                className=""
                color="white"
              />
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
