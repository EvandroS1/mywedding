'use client';

import BackButton from '@/components/Backbutton';
import { ApplicationState } from '@/store';
import { loadConvidadosRequest } from '@/store/modules/convidados/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function ConvidadosPage() {
  const convidados = useSelector((state: ApplicationState) => state?.Convidados.data);
  const confirmados = convidados.filter(c => c.confirmado);
  const naoConfirmados = convidados.filter(c => !c.confirmado);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(loadConvidadosRequest())
  },[])

  console.log('convidados', convidados)

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-6">
      <BackButton />
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 drop-shadow-lg">
          🎉 Lista de Convidados
        </h1>

        {/* Confirmados */}
        <section className="rounded-3xl max-h-80 overflow-auto backdrop-blur-md bg-white/30 border border-white/20 shadow-lg p-8">
        <div className='flex justify-between items-center'>
          <h2 className="text-3xl font-semibold text-green-700 mb-6 flex items-center gap-3">
            ✅ Confirmados
          </h2>
          <span className='text-2xl'>{confirmados.length}</span>
          </div>
          {confirmados.length > 0 ? (
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {confirmados.map((c, i) => (
                <li
                  key={`conf-${i}`}
                  className="bg-white/40 backdrop-blur-lg border border-green-200 text-green-900 px-4 py-3 rounded-2xl shadow transition hover:scale-105"
                >
                  {c.nome}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">Nenhum convidado confirmou ainda.</p>
          )}
        </section>

        {/* Não Confirmados */}
        <section className="rounded-3xl max-h-80 overflow-auto backdrop-blur-md bg-white/30 border border-white/20 shadow-lg p-8">
          <div className='flex justify-between items-center'>
          <h2 className="text-3xl font-semibold text-yellow-700 mb-6 flex items-center gap-3">
            ⏳ Não Confirmados
          </h2>
          <span className='text-2xl'>{naoConfirmados.length}</span>
          </div>
          {naoConfirmados.length > 0 ? (
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {naoConfirmados.map((c, i) => (
                <li
                  key={`nconf-${i}`}
                  className="bg-white/40 backdrop-blur-lg border border-yellow-200 text-yellow-900 px-4 py-3 rounded-2xl shadow transition hover:scale-105"
                >
                  {c.nome}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">Todos os convidados confirmaram! 🎊</p>
          )}
        </section>
      </div>
    </main>
  );
}
