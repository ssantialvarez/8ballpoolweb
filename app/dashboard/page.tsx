'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { poolService } from '@/lib/api/poolService';
import { Match } from '@/types/Match';
import { Player } from '@/types/Player';
import MatchesTable from '@/components/matches/MatchesTable';
import AddMatchButton from '@/components/matches/AddMatchButton';
import { useState } from 'react';
import Modal from '@/components/ui/modal/Modal';
import Button from '@/components/ui/button/Button';
import { FinishMatchDto } from '@/types/Match';

export default function DashboardPage() {
  const [finishMatchId, setFinishMatchId] = useState<number | null>(null);
  const [selectedWinnerId, setSelectedWinnerId] = useState<number>(0);
  const queryClient = useQueryClient();

  const { data: matches = [], isLoading, error } = useQuery({
    queryKey: ['matches'],
    queryFn: poolService.matches.getMatches,
  });

  // Obtener lista de jugadores (puede venir del caché si ya fue cargada)
  const { data: players = [] } = useQuery({
    queryKey: ['players'],
    queryFn: poolService.players.getPlayers,
    staleTime: 5 * 60 * 1000, // 5 minutos - los datos de jugadores no cambian tan seguido
  });

  const finishMutation = useMutation({
    mutationFn: ({ matchId, finishData }: { matchId: number; finishData: FinishMatchDto }) =>
      poolService.matches.finishMatch(matchId, finishData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      setFinishMatchId(null);
      setSelectedWinnerId(0);
    },
    onError: (error: any) => {
      console.error('Error finishing match:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to finish match.';
      alert(errorMessage);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (matchId: number) => poolService.matches.deleteMatch(matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
    onError: (error: any) => {
      console.error('Error deleting match:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to delete match.';
      alert(errorMessage);
    },
  });

  const handleFinishMatch = (matchId: number) => {
    setFinishMatchId(matchId);
  };

  const handleConfirmFinish = () => {
    if (finishMatchId && selectedWinnerId > 0) {
      finishMutation.mutate({
        matchId: finishMatchId,
        finishData: { winnerId: selectedWinnerId },
      });
    }
  };

  const handleDeleteMatch = (matchId: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este partido?')) {
      deleteMutation.mutate(matchId);
    }
  };

  const currentMatch = matches.find((m: Match) => m.id === finishMatchId);

  return (
    <div className="app-container">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-semibold ">Dashboard - Partidos</h1>
          <AddMatchButton />
        </div>

        
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Cargando partidos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error al cargar los partidos</p>
            </div>
          ) : (
            <MatchesTable
              matches={matches}
              players={players}
              onFinishMatch={handleFinishMatch}
              onDeleteMatch={handleDeleteMatch}
            />
          )}
        


      {/* Modal para finalizar partido */}
      <Modal
        isOpen={finishMatchId !== null}
        onClose={() => {
          setFinishMatchId(null);
          setSelectedWinnerId(0);
        }}
        title="Finalizar Partido"
      >
        {currentMatch && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Selecciona el ganador del partido:
            </p>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <input
                  type="radio"
                  name="winner"
                  value={currentMatch.player1Id}
                  checked={selectedWinnerId === currentMatch.player1Id}
                  onChange={(e) => setSelectedWinnerId(Number(e.target.value))}
                  className="w-4 h-4"
                />
                <span className="font-medium">
                  {players.find((p: Player) => p.id === currentMatch.player1Id)?.name || `Jugador #${currentMatch.player1Id}`}
                </span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <input
                  type="radio"
                  name="winner"
                  value={currentMatch.player2Id}
                  checked={selectedWinnerId === currentMatch.player2Id}
                  onChange={(e) => setSelectedWinnerId(Number(e.target.value))}
                  className="w-4 h-4"
                />
                <span className="font-medium">
                  {players.find((p: Player) => p.id === currentMatch.player2Id)?.name || `Jugador #${currentMatch.player2Id}`}
                </span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleConfirmFinish}
                disabled={selectedWinnerId === 0 || finishMutation.isPending}
                className="flex-1 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {finishMutation.isPending ? 'Finalizando...' : 'Confirmar'}
              </Button>
              <Button
                onClick={() => {
                  setFinishMatchId(null);
                  setSelectedWinnerId(0);
                }}
                disabled={finishMutation.isPending}
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
