import { useEffect, useState } from "react";
import { ShoppingCart, Trash } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@headlessui/react";
// import { useSession } from "next-auth/react";
import { ApplicationState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import formatValue from "@/functions/formatValue";
import { loadUpdateFavRequest } from "@/store/modules/favoritos/actions";
import { Fav } from "@/store/modules/favoritos/types";
import { CartItemProps } from "../../../types/cart";
import { loadCartRequest, loadUpdateCartRequest } from "@/store/modules/loja/actions";
import { loadSideBarRequest } from "@/store/modules/sideBars/actions";


const FavItem = () => {
  // const { data: session } = useSession();
  const [favItems, setFavItems] = useState<Fav[] | undefined>([]);
  const fav = useSelector((state: ApplicationState) => state.Favoritos.data)
  const user = useSelector((state: ApplicationState) => state.User.data)
  const cart = useSelector((state: ApplicationState) => state.Cart.data)

  const dispatch = useDispatch();


  useEffect(() => {
    setFavItems(fav)
  },[fav])

  const handleRemoveItem = async (indexToRemove: number) => {
      console.log('foi')
      const updatedFavItems = favItems?.filter(
        (_, index) => index !== indexToRemove
      );
      setFavItems(updatedFavItems);
      console.log('updatedFavItems', updatedFavItems, user?.id, user?.email)
      if(!updatedFavItems) return
  
      dispatch(loadUpdateFavRequest(updatedFavItems, user?.id, user?.email));
    };

    const updateCart =  ({id, nome, image, valor, qtde}: CartItemProps) => {
        const carrinhoItem = {
          id: id,
          nome: nome,
          image: image,
          valor: valor,
          qtde: qtde,
        };
      
        if (!user) return;
      
        // Verifica se item já existe
        const existingItemIndex = cart.findIndex(
          (item: CartItemProps) => item.nome === carrinhoItem.nome
        );
      
        let updatedCart: CartItemProps[];
    
        if (existingItemIndex !== -1) {
          // Item já existe, incrementa qtde
          updatedCart = [...cart];
          updatedCart = updatedCart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, qtde: item.qtde + 1 }
              : item
          );
          
          
        } else {
          // Item novo, adiciona ao carrinho
          console.log('cart', cart)
          updatedCart = [...cart, carrinhoItem];
        }
        console.log('user?.id', updatedCart)
    
        dispatch(loadUpdateCartRequest(updatedCart, user.id, user?.email));
        dispatch(loadCartRequest(user?.email));
        dispatch(loadSideBarRequest({cartOpen: true, favOpen: false}));
        
        
          // onAddToCart();
        
      };

  return (
    <>
      {fav?.length === 0 ? (
        <div className="flex h-full w-full justify-center items-center">
          <img src="/assets/noFav.png" alt="sem favoritos" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {favItems?.map((item, index) => (
              <motion.div
                key={`${item.nome}-${index}-${item.image}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-md"
              >
                <div className=" w-full flex flex-col gap-2 items-center">
                  <div className="flex flex-col items-center justify-between gap-2">
                    <h3 className="text-lg text-center w-full font-semibold">
                      {item.nome}
                    </h3>
                    <img
                      src={item.image}
                      alt={item.nome}
                      className="w-24 rounded-lg self-center"
                    />
                    <div className="flex flex-col justify-end items-center">
                      <p className="text-gray-500">{formatValue(item.valor)}</p>
                      <Trash
                        size={20}
                        className="cursor-pointer"
                        color="red"
                        onClick={() => handleRemoveItem(index)}
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => updateCart({id: item.id, nome: item.nome, image: item.image, valor: item.valor, qtde: 1})}
                    className="bg-amber-700 w-full rounded-lg flex justify-center items-center h-10"
                  >
                    <ShoppingCart color="white" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default FavItem;
