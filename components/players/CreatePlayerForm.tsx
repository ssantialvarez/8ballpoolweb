'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/button/Button';

interface CreatePlayerFormProps {
  onSubmit: (playerData: CreatePlayerData, file: File | null) => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
  initialData?: CreatePlayerData;
}

export interface CreatePlayerData {
  auth0_id: string;
  name: string;
  ranking: number;
  preferred_cue?: string;
  profile_picture?: string;
}

export default function CreatePlayerForm({ 
  onSubmit, 
  onCancel, 
  isLoading = false, 
  mode = 'create',
  initialData 
}: CreatePlayerFormProps) {
  const [formData, setFormData] = useState<CreatePlayerData>(
    initialData || {
      auth0_id: '',
      name: '',
      ranking: 0,
      preferred_cue: '',
      profile_picture: '',
    }
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'ranking' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
        return;
      }

      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        profile_picture: file.name,
      }));

      // Crear URL de vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData((prev) => ({
      ...prev,
      profile_picture: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, selectedFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

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
        <label htmlFor="profile_picture" className="block text-sm font-medium mb-1">
          Profile Picture
        </label>
        
        {previewUrl ? (
          <div className="space-y-3">
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
                {selectedFile?.name}
              </span>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="profile_picture"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click para subir</span> o arrastra la imagen
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG (MAX. 5MB)</p>
              </div>
              <input
                id="profile_picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading 
            ? (mode === 'edit' ? 'Updating...' : 'Creating...') 
            : (mode === 'edit' ? 'Update Player' : 'Create Player')
          }
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
      
      {isLoading && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            {selectedFile ? 'Uploading image to S3...' : 'Processing...'}
          </p>
        </div>
      )}
    </form>
  );
}
