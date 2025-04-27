import "../../app/globals.css";

const Sections = () => {
  return (
    <>
      <div className="text-center pt-20 w-screen h-screen bg-black">
        <h1 className="text-4xl">Seções</h1>
        <div className="grid text-2xl justify-center h-full items-center grid-cols-2 gap-4 p-4 mb-20 mx-auto">
        <div className="flex flex-col gap-2">
          <div className="w-full relative bg-cover bg-center max-w-40 h-full max-h-40 min-h-40 place-self-center flex justify-center items-center rounded-2xl shadow-white shadow-md">
              <img src={"/assets/wishlist/eletro.png"} className="" />
            </div>
              <p className="relative z-10 font-extrabold">Eletrodomésticos</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full relative bg-cover bg-center max-w-40 h-full max-h-40 min-h-40 place-self-center flex justify-center items-center rounded-2xl shadow-white shadow-md">
              <img src={"/assets/wishlist/quarto.png"} className=" relative right-3" />
            </div>
              <p className="relative z-10 font-extrabold">Quarto</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full relative bg-cover bg-center max-w-40 h-full max-h-40 min-h-40 place-self-center flex justify-center items-center rounded-2xl shadow-white shadow-md">
              <img src={"/assets/wishlist/cozinha.webp"} className=" relative right-3" />
            </div>
              <p className="relative z-10 font-extrabold">Cozinha</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full relative bg-cover bg-center max-w-40 h-full max-h-40 min-h-40 place-self-center flex justify-center items-center rounded-2xl shadow-white shadow-md">
              <img src={"/assets/wishlist/sala.png"} className="" />
            </div>
              <p className="relative z-10 font-extrabold">Sala</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full relative bg-cover bg-center max-w-40 h-full max-h-40 min-h-40 place-self-center flex justify-center items-center rounded-2xl shadow-white shadow-md">
              <img src={"/assets/logo.png"} className="" />
            </div>
              <p className="relative z-10 font-extrabold">Variados</p>
        </div>
        </div>
      </div>
    </>
  );
};

export default Sections;
