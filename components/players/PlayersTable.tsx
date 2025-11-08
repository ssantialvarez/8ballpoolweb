'use client'
import { playerService } from "@/lib/api/playerService";
import { Player } from "@/types/Player";
import { useQuery } from "@tanstack/react-query";

export default function PlayersTable() {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['players'],
        queryFn: async () => playerService.players.getPlayers(),
    })
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Players</h1>
            <ul className="space-y-2">
                {data?.map((player : Player) => (
                    <li key={player.id} className="p-4 border rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold">{player.name}</h2>
                        <p className="text-gray-600">Skill Level: {player.preferred_cue}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}