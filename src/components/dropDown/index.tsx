import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";

const categorias = [
  { id: "", nome: "Todos" },
  { id: "eletro", nome: "Eletrodomésticos" },
  { id: "quarto", nome: "Quarto" },
  { id: "cozinha", nome: "Cozinha" },
  { id: "sala", nome: "Sala" },
  { id: "variado", nome: "Variados" },
];

interface Categoria {
  id: string;
  nome: string;
}

interface DropdownFiltroProps {
  filtro: string;
  setFiltro: (filtro: string) => void;
  reset: () => void;
  handleClick: (valor: string, label: string) => void;
}

export default function DropdownFiltro({
  filtro,
  reset,
  handleClick,
}: DropdownFiltroProps) {
  const [selected, setSelected] = useState(categorias[0]);
  const [open, setOpen] = useState(false);

  const onChange = (categoria: Categoria) => {
    console.log('categoria', categoria)
    setSelected(categoria);
    setOpen(!open)
    if (categoria.id === "") {
      reset();
      setOpen(!open)
    } else {
      handleClick(categoria.id, categoria.nome);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto pb-4 px-2">
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-amber-700 py-2 pl-3 pr-10 text-left text-white font-extrabold shadow-md focus:outline-none">
            {selected.nome}
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className={`w-5 h-5 text-white transition-transform ${open ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
          </Listbox.Button>

          {/* 👇 Transição para animação suave */}
          <Transition
            as="div"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Listbox.Options
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto
    rounded-xl bg-white/10 backdrop-blur-md border border-white/20
    py-2 text-base shadow-xl ring-1 ring-black/10 focus:outline-none"
            >
              {categorias.map((categoria) => (
                <Listbox.Option
                  key={categoria.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 transition ${
                      active ? "bg-white/20 text-amber-900" : "text-black font-extrabold "
                    }`
                  }
                  value={categoria}
                >
                  {filtro === categoria.id && (
                      <span className="absolute left-3 flex items-center">
                        <svg
                          className="w-5 h-5 text-amber-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  {categoria.nome}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
