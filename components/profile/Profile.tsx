"use client";

import { poolService } from "@/lib/api/poolService";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const { isPending, isError, data, error } = useQuery({
      queryKey: ['playerMe'],
      queryFn: async () => poolService.players.getPlayerMe(),
  })

  if (isPending) {
    return (
      <div className="loading-state">
        <div className="loading-text">Loading user profile...</div>
      </div>
    );
  }

  if (!data || isError) {
    return null;
  }

  return (
    <div className="profile-card action-card">
      {data.profile_picture_url && (
        <img
          src={data.profile_picture_url}
          alt={data.name || 'User profile'}
          className="profile-picture"
        />
      )}
      <h2 className="profile-name">{data.name}</h2>
      <p className="profile-ranking">Ranking: {data.ranking}</p>
      <p className="profile-preferred-cue">Preferred Cue: {data.preferred_cue}</p>
    </div>
  );
}