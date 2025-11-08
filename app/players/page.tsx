import PlayersTable from "@/components/players/PlayersTable";
import AddPlayerButton from "@/components/players/AddPlayerButton";

export default async function PlayersPage() {
    
    return (
        <div className="container mx-auto p-4">
            <AddPlayerButton className="mb-4" />
            <PlayersTable />
        </div>
    );
}