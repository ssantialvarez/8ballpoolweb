import { Player } from './Player';

export interface Match {
  id: number;
  player1Id: number;
  player2Id: number;
  startTime: string; // ISO 8601 format
  endTime?: string | null; // ISO 8601 format
  winnerId?: number | null;
  tableNumber?: number | null;
}

export interface CreateMatchDto {
  player1Id: number;
  player2Id: number;
  startTime: string; // ISO 8601 format
  endTime?: string | null;
  winnerId?: number | null;
  tableNumber?: number | null;
}

export interface UpdateMatchDto {
  tableNumber?: number | null;
}

export interface FinishMatchDto {
  winnerId: number;
}
