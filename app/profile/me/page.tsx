import Profile from '@/components/profile/Profile';

export default async function MyProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <Profile playerId="me" />
    </div>
  );
}
