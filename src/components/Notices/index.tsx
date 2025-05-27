import { ArrowRight } from "@geist-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.8,
  }),
};

interface Steps {
  title: string;
  description: string;
}

interface Notices {
  steps: Steps[];
  setFirstAcess: (value: boolean) => void;
  pular?: boolean;
} 

export default function Notices({steps, setFirstAcess, pular}: Notices) { 
   const [stepIndex, setStepIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const canGoPrev = stepIndex > 0;
  const canGoNext = stepIndex < steps.length - 1;

     const handleNext = () => {
        setDirection(1);
        setStepIndex((i) => Math.min(i + 1, steps.length - 1));
      };
      const handlePrev = () => {
        setDirection(-1);
        setStepIndex((i) => Math.max(i - 1, 0));
      };
  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md flex items-center justify-center px-4">
              {pular ? <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-md p-1 rounded-lg"><span onClick={() => setFirstAcess(false)} className="flex">Pular<ArrowRight /></span></div> : null}
              <div className="relative bg-white p-6 rounded-lg shadow-lg h-[380px] max-w-md w-full overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={stepIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center  h-full justify-around text-center"
                  >
                    <h2 className="text-2xl font-bold mb-2">
                      {steps[stepIndex].title}
                    </h2>
                    <p className="m-0 text-xl">{steps[stepIndex].description}</p>
    
                    <div className={`w-full flex items-center ${stepIndex === 0 ? "justify-center" : "justify-between"}`}>
                      {stepIndex != 0 ? <button
                        onClick={handlePrev}
                        disabled={!canGoPrev}
                        className={`px-4 py-2 rounded-lg ${
                          canGoPrev
                            ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Voltar
                      </button>: null}
                      {canGoNext ? (
                        <button
                          onClick={handleNext}
                          className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
                        >
                          Continuar
                        </button>
                      ) : (
                        <button onClick={() => setFirstAcess(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                          Começar
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
  )
}