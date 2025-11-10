"use client";

import { poolService } from "@/lib/api/poolService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import CreatePlayerForm, { CreatePlayerData } from "@/components/players/CreatePlayerForm";
import Button from "@/components/ui/button/Button";
import { Edit } from "lucide-react";

interface ProfileProps {
  playerId: string;
}

export default function Profile({ playerId }: ProfileProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const isOwnProfile = playerId === 'me';

  const { isPending, isError, data, error } = useQuery({
      queryKey: ['player', playerId],
      queryFn: async () => {
        if (playerId === 'me') {
          return poolService.players.getPlayerMe();
        }
        return poolService.players.getPlayerById(playerId);
      },
  })

  const updateMutation = useMutation({
    mutationFn: (playerData: CreatePlayerData) => {
      const { auth0_id, ...updateData } = playerData;
      return poolService.players.updatePlayerMe(updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player', playerId] });
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil. Inténtalo de nuevo.');
    },
  });

  const handleEditSubmit = (playerData: CreatePlayerData) => {
    updateMutation.mutate(playerData);
  };

  if (isPending) {
    return (
      <div className="loading-state">
        <div className="loading-text">Loading user profile...</div>
      </div>
    );
  }

  if (!data || isError) {
    return null;
  }

  return (
    <>
      <div className="profile-card action-card">
        {data.profile_picture_url && (
          <img
            src={data.profile_picture_url}
            alt={data.name || 'User profile'}
            className="profile-picture"
          />
        )}
        <h2 className="profile-name">{data.name}</h2>
        <p className="profile-ranking">Ranking: {data.ranking}</p>
        <p className="profile-preferred-cue">Preferred Cue: {data.preferred_cue}</p>
        
        {isOwnProfile && (
          <Button
            onClick={() => setIsEditModalOpen(true)}
            className="mt-4 bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
          >
            <Edit size={16} />
            Editar Perfil
          </Button>
        )}
      </div>

      {isOwnProfile && (
        <Modal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          title="Editar Perfil"
        >
          <CreatePlayerForm
            mode="edit"
            initialData={data}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditModalOpen(false)}
            isLoading={updateMutation.isPending}
          />
        </Modal>
      )}
    </>
  );
}