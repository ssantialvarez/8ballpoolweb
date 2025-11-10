import { Player } from './Player';

export interface PlayerWithPresignedUrl extends Player {
  profile_picture_url: string; // URL presignada de S3
}
