'use client';

import React from 'react';
import { Match } from '@/types/Match';
import { Player } from '@/types/Player';
import { Trophy, Clock, Calendar, Hash } from 'lucide-react';


interface MatchesTableProps {
  matches: Match[];
  players: Player[];
  onFinishMatch?: (matchId: number) => void;
  onDeleteMatch?: (matchId: number) => void;
}

export default function MatchesTable({ matches, players, onFinishMatch, onDeleteMatch }: MatchesTableProps) {
  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No hay partidos registrados aún</p>
        <p className="text-sm mt-2">Crea un nuevo partido para comenzar</p>
      </div>
    );
  }

  const findPlayerById = (playerId: number): Player | undefined => {
    return players.find(p => p.id === playerId);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch {
      return dateString;
    }
  };

  const getMatchStatus = (match: Match) => {
    if (match.endTime && match.winnerId) {
      return 'finished';
    }
    return 'ongoing';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600">
            <th className="text-left p-4 font-semibold">Jugadores</th>
            <th className="text-left p-4 font-semibold">Inicio</th>
            <th className="text-left p-4 font-semibold">Mesa</th>
            <th className="text-left p-4 font-semibold">Estado</th>
            <th className="text-left p-4 font-semibold">Ganador</th>
            <th className="text-right p-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => {
            const status = getMatchStatus(match);
            return (
              <tr
                key={match.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">
                      {findPlayerById(match.player1Id)?.name || `Jugador #${match.player1Id}`}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">vs</span>
                    <span className="font-medium">
                      {findPlayerById(match.player2Id)?.name || `Jugador #${match.player2Id}`}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-gray-500" />
                    {formatDate(match.startTime)}
                  </div>
                </td>
                <td className="p-4">
                  {match.tableNumber ? (
                    <div className="flex items-center gap-2">
                      <Hash size={16} className="text-gray-500" />
                      <span>{match.tableNumber}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-4">
                  {status === 'finished' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Trophy size={14} />
                      Finalizado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      <Clock size={14} />
                      En curso
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {match.winnerId ? (
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-yellow-500" />
                      <span className="font-medium">
                        {findPlayerById(match.winnerId)?.name || `Jugador #${match.winnerId}`}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {status === 'ongoing' && onFinishMatch && (
                      <button
                        onClick={() => onFinishMatch(match.id)}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Finalizar
                      </button>
                    )}
                    {onDeleteMatch && (
                      <button
                        onClick={() => onDeleteMatch(match.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
