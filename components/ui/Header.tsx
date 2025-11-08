import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import AuthButton from './button/AuthButton';
import { auth0 } from '@/lib/auth0';
import { env } from 'process';
import { decodeJwt, getPermissionsFromToken } from '@/lib/utils/decodeJwt';

const Header: React.FC = async () => {
  const session = await auth0.getSession();
  const accessToken = session?.tokenSet?.accessToken || null;
  
  let permissions: string[] | null = null;
  if (accessToken && typeof accessToken === 'string') {
    try {
      const decoded = decodeJwt(accessToken);
      permissions = getPermissionsFromToken(decoded);
    } catch (error) {
      console.error('Error decoding access token:', error);
    }
  }
  
  return (
    <header className="header-container">
      <div className="header-content">
        <a href="/"><h1 className="header-title">8 Ball Pool Web</h1></a>
        <nav className="header-nav">
          {session ? (
            <>
              
              <a href="/tournaments" className="nav-link">Tournaments</a>
              <a href="/profile" className="nav-link">Profile</a>
              {permissions && permissions.includes('admin') && (
                <a href="/players" className="nav-link">Players</a>
              )}
              <AuthButton variant="logout" className="nav-link" />
            </>
          ) : (
            <>
              <AuthButton variant="login" className="nav-link" />
              <AuthButton variant="signup" className="nav-link" />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;