import { redirect } from 'next/navigation';
import { auth0 } from '@/lib/auth0';

export default async function ProfilePage() {
  const session = await auth0.getSession();
  
  if (!session?.user) {
    redirect('/auth/login');
  }

  // Redirect to the user's own profile using their player ID
  // This assumes the user has a player record created
  redirect('/profile/me');
}
