import { useState } from "react";
import { ShoppingCart, Trash } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@headlessui/react";
// import { useSession } from "next-auth/react";
import IFavItem from "../../../types/fav";
import { ApplicationState } from "@/store";
import { useSelector } from "react-redux";
import formatValue from "@/functions/formatValue";



interface IFav {
  handleDelete: () => void;
}

const FavItem = ({ handleDelete }: IFav) => {
  // const { data: session } = useSession();
  const [favItems, setFavItems] = useState<IFavItem[] | undefined>([]);
  const fav = useSelector((state: ApplicationState) => state.Favoritos.data)

  const handleRemoveItem = async (indexToRemove: number) => {
    const updatedFavItems = favItems?.filter(
      (_, index) => index !== indexToRemove
    );
    setFavItems(updatedFavItems?.reverse());

    try {
      await fetch(
        `https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/shopProfile/id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favoritos: updatedFavItems }),
        }
      );
    } catch {
      console.error("Error updating cart");
    }
    handleDelete();
  };

  const handleClick = () => {};

  return (
    <>
      {fav?.length === 0 ? (
        <div className="flex h-full w-full justify-center items-center">
          <img src="/assets/noFav.png" alt="sem favoritos" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {fav?.map((item, index) => (
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
      )}
    </>
  );
};

export default FavItem;
