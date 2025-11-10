import apiClient from "./apiClient";
import { User } from "@auth0/nextjs-auth0/types";
import { AxiosError } from "axios";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { env } from "process";

export interface CreatePlayerPayload {
    name: string;
    ranking: number;
    preferred_cue?: string;
    profile_picture_url?: string;
}

export const poolService = {
    players: {
        // player service methods
        getPlayers: async () => {
            const token = await getAccessToken();
            const response = await apiClient.get(`/players`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        getPlayerMe: async () => {
            const token = await getAccessToken();
            const response = await apiClient.get(`/players/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        getPlayerById: async (id: string) => {
            const token = await getAccessToken();
            const response = await apiClient.get(`/players/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        updatePlayerMe: async (playerData: Partial<CreatePlayerPayload>) => {
            const token = await getAccessToken();
            const response = await apiClient.put(`/players/me`, playerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        createPlayerFromForm: async (playerData: CreatePlayerPayload) => {
            const token = await getAccessToken();
            const response = await apiClient.post(`/players`, playerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        createPlayer: async (playerData: User) => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                myHeaders.append("Accept", "application/json");

                var urlencoded = new URLSearchParams();
                urlencoded.append("grant_type", "client_credentials");
                urlencoded.append("client_id", env.AUTH0_CLIENT_ID || "");
                urlencoded.append("client_secret", env.AUTH0_CLIENT_SECRET || "");
                urlencoded.append("audience", "http://localhost:5234");

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded
                };

                var response = await fetch(`${env.AUTH0_DOMAIN}/oauth/token`, requestOptions)
                    .then(response => response.json())
                    .catch(error => console.log('error', error));
                var token = response.access_token;

                response = await apiClient.post(`/auth/register`, {
                    auth0_id: playerData.sub,
                    name: playerData.name,
                    ranking: 0,
                    preferred_cue: "string",
                    profile_picture: playerData.picture,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                
                return response.data;
            } catch (error: any) {
                const err = new AxiosError(error);
                console.error("Error creating player:", err.name);
            }
        },
        deletePlayer: async (playerId: number) => {
            try {
                const token = await getAccessToken();
                const response = await apiClient.delete(`/players/${playerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error: any) {
                const err = new AxiosError(error);
                console.error("Error deleting player:", err.name);
            }
        },
    },
};