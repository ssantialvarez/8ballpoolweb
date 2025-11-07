export interface Player {
    id: number;
    auth0_id: string;
    name: string;
    ranking: number;
    preferred_cue?: string;
    profile_picture_url: string;
}