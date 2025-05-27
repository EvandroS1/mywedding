'use client';

import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import { ArrowLeft } from '@geist-ui/icons';

interface BackButtonProps {
  color?: boolean;
}

export default function BackButton({ color = false }: BackButtonProps) {
  const router = useRouter();

  return (
    <Menu as="div" className="fixed top-4 left-4 z-40">
      <Menu.Button
        onClick={() => router.back()}
        className="inline-flex items-center px-3 hover:scale-110 py-2 rounded-2xl bg-white/20 backdrop-blur-md text-sm font-medium text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
      >
        <ArrowLeft color={color ? 'white' : 'black'} />
      </Menu.Button>
    </Menu>
  );
}
