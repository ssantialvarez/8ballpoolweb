import { create } from "domain";
import apiClient from "./apiClient";
import { User } from "@auth0/nextjs-auth0/types";
import { AxiosError } from "axios";

export const playerService = {
    players: {
        // player service methods
        getPlayers: async (token: string) => {
            const response = await apiClient.get(`/players`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        createPlayer: async (token: string, playerData: User) => {
            try {
                const response = await apiClient.post(`/auth/register`, {                    
                        auth0_id: playerData.sub,
                        name: playerData.name,
                        ranking: 0,
                        preferred_cue: "string",
                        profile_picture_url: playerData.picture,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Response:", response);
                return response.data;
            } catch (error : any) {
                const err = new AxiosError(error);
                console.error("Error creating player:", err.name);
            }
        },
    },
};