'use client'

import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { useSession, signOut } from 'next-auth/react'

export default function ProfileOptions() {
  const { data: session } = useSession()

  return (
    <div className="fixed bottom-6 bg-black w-[70%] z-50 flex justify-center items-center">
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton className="flex items-center justify-center w-full gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-black shadow-lg hover:bg-white/30 transition">
              <img
                src={session?.user?.image ?? ''}
                alt="Imagem de perfil"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold">{session?.user?.name}</span>
              <svg
                className={`w-4 h-4 rotate-180 transition-transform ${open ? 'rotate-0' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </PopoverButton>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel
                className="absolute bottom-full mb-2 w-52 rounded-xl bg-white/10 text-black backdrop-blur-md border border-white/20 p-3 text-sm shadow-xl"
              >
                <a
                  className="block rounded-lg px-3 py-2 transition hover:bg-white/20 font-semibold"
                  href="#"
                >
                  Perfil
                </a>
                <button
                  className="w-full text-left rounded-lg px-3 py-2 transition hover:bg-white/20 font-semibold"
                  onClick={() => signOut({callbackUrl: 'http://localhost:3000/presentes'})}
                >
                  Sair
                </button>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
