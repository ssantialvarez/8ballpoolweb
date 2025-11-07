import { Player } from "@/types/Player";
const mockPlayers: Player[] = [
    { id: 1, name: 'Alice Johnson', preferred_cue: 'Plain wood (no design)', auth0_id: '', ranking: 0, profile_picture_url: '' },
    { id: 2, name: 'Bob Smith', preferred_cue: 'Sneaky pete', auth0_id: '', ranking: 0, profile_picture_url: '' },
    { id: 3, name: 'Charlie Brown', preferred_cue: 'American', auth0_id: '', ranking: 0, profile_picture_url: '' },
    { id: 4, name: 'Diana Prince', preferred_cue: 'merry widow', auth0_id: '', ranking: 0, profile_picture_url: '' },
];

export default function PlayersPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Players</h1>
            <ul className="space-y-2">
                {mockPlayers.map((player) => (
                    <li key={player.id} className="p-4 border rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold">{player.name}</h2>
                        <p className="text-gray-600">Skill Level: {player.preferred_cue}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}