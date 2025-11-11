'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import Modal from '@/components/ui/modal/Modal';
import CreateMatchForm from '@/components/matches/CreateMatchForm';
import { poolService } from '@/lib/api/poolService';
import { CreateMatchDto } from '@/types/Match';

interface AddMatchButtonProps {
  className?: string;
}

export default function AddMatchButton({ className }: AddMatchButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Obtener lista de jugadores para el formulario
  const { data: players = [] } = useQuery({
    queryKey: ['players'],
    queryFn: poolService.players.getPlayers,
  });

  // Obtener datos del usuario actual
  const { data: currentPlayer } = useQuery({
    queryKey: ['player', 'me'],
    queryFn: poolService.players.getPlayerMe,
  });

  const mutation = useMutation({
    mutationFn: (matchData: CreateMatchDto) => poolService.matches.createMatch(matchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      console.error('Error creating match:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to create match. Please try again.';
      alert(errorMessage);
    },
  });

  const handleSubmit = (matchData: CreateMatchDto) => {
    mutation.mutate(matchData);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`px-7 py-4 text-lg font-semibold rounded-xl border-none cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] shadow-[0_8px_20px_rgba(0,0,0,0.4)] uppercase tracking-[0.08em] outline-none focus:shadow-[0_0_0_4px_rgba(99,179,237,0.5)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 bg-green-500 text-white hover:bg-green-600 ${className}`}
      >
        Agregar Partido
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Nuevo Partido">
        <CreateMatchForm
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={mutation.isPending}
          players={players}
          currentPlayer={currentPlayer}
        />
      </Modal>
    </>
  );
}
