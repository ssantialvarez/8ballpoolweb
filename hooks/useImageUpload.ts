import { useState } from 'react';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

interface UseImageUploadReturn {
  uploadImage: (file: File, presignedUrl: string) => Promise<void>;
  uploading: boolean;
  uploadError: string | null;
}

export function useImageUpload(): UseImageUploadReturn {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadImage = async (file: File, presignedUrl: string): Promise<void> => {
    setUploading(true);
    setUploadError(null);

    try {
      // Subir usando la URL presignada con fetch (más simple que SDK para URLs presignadas)
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read'
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      console.log('Image uploaded successfully to S3');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setUploadError(errorMessage);
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadImage,
    uploading,
    uploadError,
  };
}
