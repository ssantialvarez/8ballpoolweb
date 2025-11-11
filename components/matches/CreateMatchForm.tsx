'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import { CreateMatchDto } from '@/types/Match';
import { Player } from '@/types/Player';

interface CreateMatchFormProps {
  onSubmit: (matchData: CreateMatchDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
  players: Player[];
  currentPlayer?: Player;
}

export default function CreateMatchForm({ 
  onSubmit, 
  onCancel, 
  isLoading = false,
  players,
  currentPlayer
}: CreateMatchFormProps) {
  const [formData, setFormData] = useState<CreateMatchDto>({
    player1Id: currentPlayer?.id || 0,
    player2Id: 0,
    startTime: new Date().toISOString().slice(0, 16), // formato datetime-local
    tableNumber: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'player1Id' || name === 'player2Id' || name === 'tableNumber'
        ? (value === '' ? null : Number(value))
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.player1Id === 0 || formData.player2Id === 0) {
      alert('Debes seleccionar ambos jugadores');
      return;
    }
    
    if (formData.player1Id === formData.player2Id) {
      alert('Los jugadores deben ser diferentes');
      return;
    }

    // Convertir datetime-local a UTC ISO 8601
    const localDateTime = new Date(formData.startTime);
    const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000);
    
    const matchDataWithUTC = {
      ...formData,
      startTime: utcDateTime.toISOString(),
    };

    onSubmit(matchDataWithUTC);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="player1Id" className="block text-sm font-medium mb-1">
          Tú (Jugador 1)
        </label>
        <input
          type="text"
          id="player1Id"
          value={currentPlayer?.name || 'Cargando...'}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:text-white cursor-not-allowed"
        />
      </div>

      <div>
        <label htmlFor="player2Id" className="block text-sm font-medium mb-1">
          Rival *
        </label>
        <select
          id="player2Id"
          name="player2Id"
          value={formData.player2Id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value={0}>Seleccionar rival</option>
          {players
            .filter(player => player.id !== currentPlayer?.id)
            .map((player) => (
              <option key={player.id} value={player.id}>
                {player.name} (Ranking: {player.ranking})
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="startTime" className="block text-sm font-medium mb-1">
          Hora de inicio *
        </label>
        <input
          type="datetime-local"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="tableNumber" className="block text-sm font-medium mb-1">
          Número de mesa
        </label>
        <input
          type="number"
          id="tableNumber"
          name="tableNumber"
          value={formData.tableNumber || ''}
          onChange={handleChange}
          min="1"
          placeholder="Opcional"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creando...' : 'Crear Partido'}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
