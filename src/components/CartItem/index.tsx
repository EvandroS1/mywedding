import { useEffect, useState } from "react";
import { Trash } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import getUsers from "@/functions/getUsers";
import IUsers from "../../../types/user";
import { useSession } from "next-auth/react";
import CartItemProps from "../../../types/cart";
import formatCurrency from "@/functions/FormatValue";

const CartItem = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[] | undefined>([]);
  const { data: session } = useSession();
  const [user, setUser] = useState<IUsers | undefined>();

  const putCart = async (data: CartItemProps[] | undefined) => {
    try {
      await fetch(
        `https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/shopProfile/${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ carrinho: data }),
        }
      );
    } catch {
      console.error("Error updating cart");
    }
  };
  useEffect(() => {
    async function loadUsers() {
      const data: IUsers[] = await getUsers();
      const user = data.find((user) => user.email === session?.user?.email);
      setUser(user);
      setCartItems(user?.carrinho);
    }

    loadUsers();
  }, []);

  const handleRemoveItem = async (indexToRemove: number) => {
    const updatedCartItems = cartItems?.filter(
      (_, index) => index !== indexToRemove
    );
    setCartItems(updatedCartItems);

    putCart(updatedCartItems);
  };

  const handleQtde = (indexToUpdate: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCartItems = cartItems?.map((item, index) =>
      index === indexToUpdate ? { ...item, qtde: newQuantity } : item
    );
    putCart(updatedCartItems);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <AnimatePresence>
        {cartItems?.length == 0 ? (
          <div className="flex h-full w-full justify-center items-center">
            <img src="/assets/noCart.png" alt="sem itens carrinho" />
          </div>
        ) : (
          cartItems?.map((item, index) => (
            <motion.div
              key={`${item.nome}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-md"
            >
              <img
                src={item.image}
                alt={item.nome}
                className="w-24 rounded-lg self-center"
              />
              <div className="flex flex-col justify-end items-center">
                <h3 className="text-lg text-center max-w-32 font-semibold">
                  {item.nome}
                </h3>
                <p className="text-gray-500">{formatCurrency(item.valor)}</p>
                <Trash
                  size={20}
                  className="cursor-pointer"
                  color="red"
                  onClick={() => handleRemoveItem(index)}
                />
                <div className="flex items-center justify-center w-28 shadow-sm bg-gray-500 rounded-lg gap-2 mt-2">
                  <button
                    className="w-6"
                    onClick={() => handleQtde(index, item.qtde + 1)}
                  >
                    +
                  </button>
                  <input
                    className="w-10 text-center"
                    type="text"
                    name="qtd"
                    id="qtd"
                    onChange={(e) =>
                      handleQtde(index, parseInt(e.target.value) || 1)
                    }
                    value={item.qtde}
                    readOnly
                  />
                  <button
                    className="w-6"
                    onClick={() => handleQtde(index, item.qtde - 1)}
                  >
                    -
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartItem;
