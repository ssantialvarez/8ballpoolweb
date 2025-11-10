import Profile from '@/components/profile/Profile';

interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlayerProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  
  return (
    <div className="container mx-auto p-4">
      <Profile playerId={id} />
    </div>
  );
}
