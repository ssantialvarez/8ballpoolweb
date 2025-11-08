'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';

interface CreatePlayerFormProps {
  onSubmit: (playerData: CreatePlayerData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface CreatePlayerData {
  auth0_id: string;
  name: string;
  ranking: number;
  preferred_cue?: string;
  profile_picture_url?: string;
}

export default function CreatePlayerForm({ onSubmit, onCancel, isLoading = false }: CreatePlayerFormProps) {
  const [formData, setFormData] = useState<CreatePlayerData>({
    auth0_id: '',
    name: '',
    ranking: 0,
    preferred_cue: '',
    profile_picture_url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'ranking' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="auth0_id" className="block text-sm font-medium mb-1">
         Auth0ID *
        </label>
        <input
          type="text"
          id="auth0_id"
          name="auth0_id"

          value={formData.auth0_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>   
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="ranking" className="block text-sm font-medium mb-1">
          Ranking *
        </label>
        <input
          type="number"
          id="ranking"
          name="ranking"
          value={formData.ranking}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="preferred_cue" className="block text-sm font-medium mb-1">
          Preferred Cue
        </label>
        <input
          type="text"
          id="preferred_cue"
          name="preferred_cue"
          value={formData.preferred_cue}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="profile_picture_url" className="block text-sm font-medium mb-1">
          Profile Picture URL
        </label>
        <input
          type="url"
          id="profile_picture_url"
          name="profile_picture_url"
          value={formData.profile_picture_url}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating...' : 'Create Player'}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
