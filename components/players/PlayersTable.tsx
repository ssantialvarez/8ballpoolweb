'use client'
import { poolService } from "@/lib/api/poolService";
import { Player } from "@/types/Player";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Dropdown, { DropdownOption } from "@/components/ui/dropdown/Dropdown";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlayersTable() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['players'],
        queryFn: async () => poolService.players.getPlayers(),
    })

    const deleteMutation = useMutation({
        mutationFn: (playerId: number) => poolService.players.deletePlayer(playerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
        },
        onError: (error) => {
            console.error('Error deleting player:', error);
            alert('Error al eliminar el jugador. Inténtalo de nuevo.');
        },
    });

    const getPlayerOptions = (player: Player): DropdownOption[] => [
        {
            label: 'Ver Perfil',
            icon: <Eye size={16} />,
            onClick: () => router.push(`/profile/${player.id}`),
        },
        {
            label: 'Eliminar',
            icon: <Trash2 size={16} />,
            variant: 'danger',
            onClick: () => handleDeletePlayer(player.id),
        },
    ];

    const handleDeletePlayer = (playerId: number) => {
        const confirmed = confirm(`¿Estás seguro de que quieres eliminar este jugador? Esta acción no se puede deshacer.`);
        if (confirmed) {
            deleteMutation.mutate(playerId);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Players</h1>
            <ul className="space-y-2">
                {data?.map((player : Player) => (
                    <li key={player.id} className="p-4 border rounded-lg shadow-sm flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">{player.name}</h2>
                            <p className="text-gray-600">Skill Level: {player.preferred_cue}</p>
                        </div>
                        <Dropdown options={getPlayerOptions(player)} />
                    </li>
                ))}
            </ul>
        </>
    );
}