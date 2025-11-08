'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '@/components/ui/modal/Modal';
import CreatePlayerForm, { CreatePlayerData } from '@/components/players/CreatePlayerForm';
import { poolService } from '@/lib/api/poolService';

interface AddPlayerButtonProps {
  className?: string;
}

export default function AddPlayerButton({ className }: AddPlayerButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (playerData: CreatePlayerData) => poolService.players.createPlayerFromForm(playerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error('Error creating player:', error);
      alert('Failed to create player. Please try again.');
    },
  });

  const handleSubmit = (playerData: CreatePlayerData) => {
    mutation.mutate(playerData);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`px-7 py-4 text-lg font-semibold rounded-xl border-none cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] shadow-[0_8px_20px_rgba(0,0,0,0.4)] uppercase tracking-[0.08em] outline-none focus:shadow-[0_0_0_4px_rgba(99,179,237,0.5)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 bg-blue-500 text-white hover:bg-blue-600 ${className}`}
      >
        Agregar Jugador
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Nuevo Jugador">
        <CreatePlayerForm
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={mutation.isPending}
        />
      </Modal>
    </>
  );
}
