"use client";
import Card from "@/components/card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../app/globals.css";
// import { useSession } from "next-auth/react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Heart, HeartFill, Home, ShoppingCart, User } from "@geist-ui/icons";
import { useEffect, useState } from "react";
import DropdownFiltro from "@/components/dropDown";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ModalAnimado from "@/components/ModalAnimado";
import SidebarCarrinho from "@/components/sideBar";
import Favoritos from "@/components/Favoritos";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { loadCartRequest } from "@/store/modules/loja/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFavRequest,
  loadUpdateFavRequest,
} from "@/store/modules/favoritos/actions";
import { loadUserRequest } from "@/store/modules/user/actions";
import { ApplicationState } from "@/store";
import { Fav } from "@/store/modules/favoritos/types";
import { loadSideBarRequest } from "@/store/modules/sideBars/actions";
import Link from "next/link";
import ModalPedidos from "@/components/ModalPedidos";
import ModalRecebidos from "@/components/ModalRecebidos";
import BackButton from "@/components/Backbutton";
// import IFavItem from "../../../types/fav";

export interface Item {
  id: number;
  image: string;
  nome: string;
  valor: number;
  categoria?: [string, string?, string?];
  fill?: boolean;
  desc?: string;
}

const Presentes = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [item, setItem] = useState<Item[]>([]);
  const [show, setShow] = useState(false);
  const [showRecebidos, setShowRecebidos] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false);
  const [filtro, setFiltro] = useState<string>("");
  const [modalData, setModalData] = useState<Item | null>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: ApplicationState) => state?.User.data);
  const fav = useSelector((state: ApplicationState) => state?.Favoritos.data);
  const open = useSelector((state: ApplicationState) => state?.SideBars.data);

  const itens: Item[] = [
    {
      id: 42,
      image: "/assets/teste.webp",
      nome: "teste",
      valor: 1,
      categoria: ["eletro"],
      desc: "Máquina de lavar roupas moderna e eficiente para facilitar o dia a dia."
    },
    {
      id: 1,
      image: "/assets/wishlist/maquinaLavar.png",
      nome: "Maquina de lavar",
      valor: 4000.0,
      categoria: ["eletro"],
      desc: "Máquina de lavar roupas moderna e eficiente para facilitar o dia a dia."
    },
    {
      id: 2,
      image: "/assets/wishlist/refrigerador.png",
      nome: "Geladeira",
      valor: 4000.0,
      categoria: ["eletro", "cozinha"],
      desc: "Geladeira espaçosa e econômica, ideal para conservar alimentos frescos."
    },
    {
      id: 3,
      image: "/assets/wishlist/lava-loucas.png",
      nome: "Lava Louças",
      valor: 2089.0,
      categoria: ["eletro", "cozinha"],
      desc: "Praticidade e higiene para lavar louças com eficiência."
    },
    {
      id: 4,
      image: "/assets/wishlist/panelas.webp",
      nome: "Jogo de panela",
      valor: 489.89,
      categoria: ["cozinha"],
      desc: "Conjunto de panelas de qualidade para preparar refeições deliciosas."
    },
    {
      id: 5,
      image: "/assets/wishlist/arcondicionado.png",
      nome: "Ar-condicionado",
      valor: 2169.0,
      categoria: ["eletro"],
      desc: "Ar-condicionado potente para refrescar os ambientes com conforto."
    },
    {
      id: 6,
      image: "/assets/wishlist/armario.webp",
      nome: "Armario cozinha",
      valor: 2169.0,
      categoria: ["cozinha"],
      desc: "Armário funcional para organizar utensílios e mantimentos na cozinha."
    },
    {
      id: 7,
      image: "/assets/wishlist/tv.webp",
      nome: "Tv Smart",
      valor: 2899.0,
      categoria: ["eletro", "sala"],
      desc: "Smart TV com ótima resolução e acesso aos principais apps de streaming."
    },
    {
      id: 8,
      image: "/assets/wishlist/sofa.webp",
      nome: "Sofá 3 lugares",
      valor: 3200.0,
      categoria: ["sala"],
      desc: "Sofá confortável e espaçoso para acomodar toda a família."
    },
    {
      id: 9,
      image: "/assets/wishlist/mesa.png",
      nome: "Mesa de jantar",
      valor: 1890.0,
      categoria: ["cozinha", "sala"],
      desc: "Mesa elegante e resistente para refeições em família."
    },
    {
      id: 10,
      image: "/assets/wishlist/microondas.png",
      nome: "Micro-ondas",
      valor: 851.0,
      categoria: ["eletro", "cozinha"],
      desc: "Micro-ondas prático para aquecer e preparar alimentos com rapidez."
    },
    {
      id: 11,
      image: "/assets/wishlist/aspirados.png",
      nome: "Aspirador de pó",
      valor: 359.0,
      categoria: ["utilidades"],
      desc: "Aspirador eficiente para manter a casa sempre limpa."
    },
    {
      id: 12,
      image: "/assets/wishlist/frigobar.png",
      nome: "Frigobar",
      valor: 980.0,
      categoria: ["eletro", "cozinha"],
      desc: "Frigobar compacto e útil para bebidas e lanches."
    },
    {
      id: 13,
      image: "/assets/wishlist/liquidificador.png",
      nome: "Liquidificador",
      valor: 219.0,
      categoria: ["eletro", "cozinha"],
      desc: "Liquidificador potente para preparar sucos, vitaminas e receitas."
    },
    {
      id: 14,
      image: "/assets/wishlist/guarda-roupa.webp",
      nome: "Guarda-roupa",
      valor: 2590.0,
      categoria: ["quarto"],
      desc: "Guarda-roupa espaçoso para manter tudo organizado."
    },
    {
      id: 15,
      image: "/assets/wishlist/abajur.webp",
      nome: "Abajur",
      valor: 129.0,
      categoria: ["decoração", "quarto", "sala"],
      desc: "Abajur decorativo que traz charme e aconchego ao ambiente."
    },
    {
      id: 16,
      image: "/assets/wishlist/processador.webp",
      nome: "Processador",
      valor: 134.0,
      categoria: ["eletro", "cozinha"],
      desc: "Processador versátil para agilizar o preparo de alimentos."
    },
    {
      id: 19,
      image: "/assets/wishlist/batedeira.png",
      nome: "Batedeira",
      valor: 118.66,
      categoria: ["eletro", "cozinha"],
      desc: "Batedeira ideal para massas, bolos e outras delícias."
    },
    {
      id: 20,
      image: "/assets/wishlist/sanduicheira.png",
      nome: "Sanduicheira",
      valor: 150.49,
      categoria: ["eletro", "cozinha"],
      desc: "Sanduicheira prática para lanches rápidos e saborosos."
    },
    {
      id: 21,
      image: "/assets/wishlist/forno.png",
      nome: "Forno Elétrico",
      valor: 460.58,
      categoria: ["eletro", "cozinha"],
      desc: "Forno elétrico para assar e gratinar suas receitas favoritas."
    },
    {
      id: 23,
      image: "/assets/wishlist/pratos.webp",
      nome: "Jogo de pratos",
      valor: 410.0,
      categoria: ["cozinha"],
      desc: "Conjunto elegante de pratos para todas as ocasiões."
    },
    {
      id: 24,
      image: "/assets/wishlist/copo.webp",
      nome: "Jogo de Copos",
      valor: 99.9,
      categoria: ["cozinha"],
      desc: "Copos resistentes e estilosos para uso diário."
    },
    {
      id: 25,
      image: "/assets/wishlist/talher.png",
      nome: "Faqueiro em inox",
      valor: 220.0,
      categoria: ["cozinha"],
      desc: "Conjunto de talheres de inox com design sofisticado."
    },
    {
      id: 27,
      image: "/assets/wishlist/pano.webp",
      nome: "Jogo de panos de prato",
      valor: 47.9,
      categoria: ["cozinha"],
      desc: "Panos de prato úteis e decorativos para a cozinha."
    },
    {
      id: 28,
      image: "/assets/wishlist/tupeware.webp",
      nome: "Jogo de Tupperware",
      valor: 140.9,
      categoria: ["cozinha"],
      desc: "Potes plásticos para armazenar alimentos com segurança."
    },
    {
      id: 29,
      image: "/assets/wishlist/tompero.webp",
      nome: "Jogo de Tempero",
      valor: 290.9,
      categoria: ["cozinha"],
      desc: "Kit de recipientes para organizar temperos com praticidade."
    },
    {
      id: 30,
      image: "/assets/wishlist/pote.webp",
      nome: "Jogo de Potes Herméticos",
      valor: 257.9,
      categoria: ["cozinha"],
      desc: "Potes herméticos que mantêm os alimentos frescos por mais tempo."
    },
    {
      id: 31,
      image: "/assets/wishlist/jogo_cama.webp",
      nome: "Jogo de cama",
      valor: 161.7,
      categoria: ["quarto"],
      desc: "Conjunto macio e confortável para uma boa noite de sono."
    },
    {
      id: 32,
      image: "/assets/wishlist/toalha.webp",
      nome: "Jogo de toalha",
      valor: 99.99,
      categoria: ["quarto"],
      desc: "Toalhas felpudas e de qualidade para o dia a dia."
    },
    {
      id: 33,
      image: "/assets/wishlist/edredon.webp",
      nome: "Edredon Queen",
      valor: 189.9,
      categoria: ["quarto"],
      desc: "Edredom quentinho e macio para noites confortáveis."
    },
    {
      id: 34,
      image: "/assets/wishlist/lua.jpeg",
      nome: "Ajudar na lua de mel",
      valor: 480.0,
      categoria: ["variado"],
      desc: "Contribuição especial para a viagem de lua de mel dos noivos."
    },
    {
      id: 35,
      image: "/assets/wishlist/cortina.webp",
      nome: "Cortina Blackout",
      valor: 129.9,
      categoria: ["sala", "quarto"],
      desc: "Cortina blackout que bloqueia a luz e garante privacidade."
    },
    {
      id: 36,
      image: "/assets/wishlist/spa.jpeg",
      nome: "Vale Spa para Noiva",
      valor: 329.9,
      categoria: ["variado"],
      desc: "Um dia de relaxamento e cuidados em um spa para a noiva."
    },
    {
      id: 37,
      image: "/assets/wishlist/night.webp",
      nome: "Vale Night para os Noivos",
      valor: 357.9,
      categoria: ["variado"],
      desc: "Um momento especial de lazer e diversão para o casal."
    },
    {
      id: 38,
      image: "/assets/wishlist/play.webp",
      nome: "PlayStation 5 para o Noivo",
      valor: 3149.0,
      categoria: ["variado", "sala"],
      desc: "Diversão garantida com o novo PlayStation 5 para o noivo."
    },
    {
      id: 39,
      image: "/assets/wishlist/chaleira.webp",
      nome: "Chaleira elétrica",
      valor: 41.9,
      categoria: ["cozinha"],
      desc: "Chaleira elétrica prática para ferver água rapidamente."
    },
    {
      id: 40,
      image: "/assets/wishlist/cobertor.webp",
      nome: "Cobertor",
      valor: 146.7,
      categoria: ["quarto"],
      desc: "Cobertor quentinho para noites frias e aconchegantes."
    },
    {
      id: 41,
      image: "/assets/wishlist/cobreLeito.png",
      nome: "Cobre Leito",
      valor: 320.0,
      categoria: ["quarto"],
      desc: "Cobre leito elegante para complementar a decoração da cama."
    },
  ];

  useEffect(() => {
    const savedFilter = localStorage.getItem("filter");
    console.log("saveFilter", savedFilter);
    if (savedFilter === "todos") {
      setItem(itens);
      return;
    }
    if (savedFilter) {
      setItem(itens.filter((value) => value?.categoria?.includes(savedFilter)));
      setFiltro(savedFilter);
    } else {
      setItem(itens);
    }
  }, []);

  useEffect(() => {
    console.log('profileOpen', profileOpen)
  },[profileOpen])

  useEffect(() => {
    dispatch(loadFavRequest(session?.user?.email));
    dispatch(loadUserRequest(session?.user?.email));
    dispatch(loadCartRequest(session?.user?.email));
    console.log("session", session);
  }, [session]);

  useEffect(() => {
    if (open.cartOpen || open.favOpen || show || showRecebidos) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // limpa quando o componente desmonta
    };
  }, [open, showRecebidos, show]);

  const handleClick = (valor: string) => {
    setFiltro(valor);
    localStorage.setItem("filter", valor);
    setItem(itens.filter((value) => value?.categoria?.includes(valor)));
  };

  const reset = () => {
    setItem(itens);
    setFiltro("");
    localStorage.removeItem("filter");
  };

  const handleFav = async ({ nome, image, valor, id, fill }: Item) => {
    if (!session) {
      return toast.error(
        "Clique aqui e faça login para adicionar ao carrinho",
        { onClick: () => { toast.dismiss();router.push("/login")}, theme: "dark" }
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
    if (!fill) dispatch(loadSideBarRequest({ cartOpen: false, favOpen: true }));
  };

  return (
    <div className="font-extrabold text-xl bg-[#fcf1ed]">
      <BackButton />
      <ModalAnimado
        show={modalData !== null}
        onClose={() => setModalData(null)}
        image={modalData?.image || ""}
        nome={modalData?.nome || ""}
        valor={modalData?.valor || 0}
        id={modalData?.id || 666}
        desc={modalData?.desc || ""}
        onAddToCart={() => {
          setModalData(null);
        }}
      />
      <ModalPedidos
        show={show}
        onClose={() => setShow(false)}
      />
      <ModalRecebidos 
      show={showRecebidos}
      onClose={() =>setShowRecebidos(false)}
      />
      <SidebarCarrinho />
      <Favoritos />

      <div className="fixed gap-5 flex justify-center z-30 border-amber-700 border shadow-sm items-center bottom-6 h-20 w-10/12 bg-white/30 backdrop-blur-md left-1/2 -translate-x-1/2 rounded-2xl">
        <Home size={30} color="black" onClick={() => router.push("/")} />
        <ShoppingCart
          size={30}
          color="black"
          onClick={() =>
            dispatch(loadSideBarRequest({ cartOpen: true, favOpen: false }))
          }
        />
        <Heart
          size={30}
          color="black"
          onClick={() =>
            dispatch(loadSideBarRequest({ cartOpen: false, favOpen: true }))
          }
        />
        <Popover>
          {({close}) => (
            <>
              <PopoverButton className="transition focus:outline-none focus:ring-0">
                <User onClick={() => setProfileOpen(true)} size={30} />
              </PopoverButton>

              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute flex flex-col -translate-x-36 bottom-full mb-2 w-60 h-auto text-xl rounded-xl bg-white/80 text-black backdrop-blur-md border border-white/20 p-3 shadow-xl">
                  <div className="flex  items-center gap-2 mb-3">
                    <img
                      src={session?.user?.image ?? "assets/nouser.png"}
                      alt="Imagem de perfil"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="w-32 break-words">
                      {session?.user?.name ?? session?.user?.email ?? (
                        <span className="font-semibold">
                          Faça <Link href="/login">login</Link>
                        </span>
                      )}
                    </span>
                  </div>
                  {session?.user?.name === "tourmant vig" || session?.user?.email === "melissapequeno04@gmail.com" || session?.user?.email === "evandrogomes542@gmail.com" ? <span className="pl-10 pb-1 cursor-pointer" onClick={() => router.push('/confirmados')}>Confirmados</span> : null}
                  {session?.user?.name === "tourmant vig" || session?.user?.email === "melissapequeno04@gmail.com" || session?.user?.email === "evandrogomes542@gmail.com" ? <span className="pl-10 pb-1 cursor-pointer " onClick={() => {setShowRecebidos(true); close()}}>Presentes Recebidos</span> : null}
                  {session ? <button className="pb-4 pr-3 w-auto" onClick={() => {setShow(true); close()}}>Minhas compras</button> : null}
                  
                  {session ? <button
                    className="w-full text-left self-end bg-black rounded-lg px-3 py-2 transition text-red-400 hover:bg-white/20 font-semibold"
                    onClick={() =>
                      signOut({
                        callbackUrl: "http://localhost:3000/presentes",
                      })
                    }
                  >
                    Sair
                  </button> : null}
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      <div className="text-center p-4">
        <img src="assets/m&e.png" alt="melissa e evandro" />
        <h1 className="pt-2 text-2xl">Lista de presentes</h1>
      </div>
      <DropdownFiltro filtro={filtro} reset={reset} handleClick={handleClick} />
      <div className="grid grid-cols-2 gap-4 p-4 mb-20 mx-auto">
        {item.map((item) => (
          <div key={item.id} className="relative">
            <motion.div
              className="absolute transition-all right-4 top-4 z-20 h-8 w-8 flex justify-center items-center rounded-lg bg-black/30 backdrop-blur-lg"
              whileTap={{ scale: 1.4 }}
            >
              {fav?.find((value) => value.nome === item.nome) === undefined ? (
                <Heart
                  color="white"
                  className="relative z-10 cursor-pointer"
                  onClick={() =>
                    handleFav({
                      id: item.id,
                      nome: item.nome,
                      image: item.image,
                      valor: item.valor,
                      fill: false,
                    })
                  }
                />
              ) : (
                <HeartFill
                  fill="true"
                  color="white"
                  className="relative z-10 cursor-pointer"
                  onClick={() =>
                    handleFav({
                      id: item.id,
                      nome: item.nome,
                      image: item.image,
                      valor: item.valor,
                      fill: true,
                    })
                  }
                />
              )}
            </motion.div>
            <div onClick={() => setModalData(item)}>
              <Card image={item.image} nome={item.nome} valor={item.valor} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Presentes;
