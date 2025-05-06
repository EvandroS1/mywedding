import { useEffect, useState } from "react";
import { ShoppingCart, Trash } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@headlessui/react";

interface FavItem {
  nome: string;
  image: string;
  valor: string;
  qtde: number;
}

const FavItem = () => {
  const [cartItems, setCartItems] = useState<FavItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const handleRemoveItem = (indexToRemove: number) => {
    const updatedCartItems = cartItems.filter(
      (_, index) => index !== indexToRemove
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleClick = () => {};

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {cartItems.map((item, index) => (
          <motion.div
            key={`${item.nome}-${index}`}
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
                  
                  <p className="text-gray-500">{item.valor}</p>
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
                onClick={() => handleClick()}
                className="bg-amber-700 w-full rounded-lg flex justify-center items-center h-10"
              >
                <ShoppingCart color="white" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FavItem;
