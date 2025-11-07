"use client";

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import AuthButton from './AuthButton';

const Header: React.FC = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <header className="header-container">
        <div className="header-content">
          <h1 className="header-title">8 Ball Pool Web</h1>
          <nav className="header-nav">
            <span className="nav-link">Loading...</span>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="header-container">
      <div className="header-content">
        <a href="/"><h1 className="header-title">8 Ball Pool Web</h1></a>
        <nav className="header-nav">
          
          {user ? (
            <>
              <a href="/players" className="nav-link">Players</a>
              <a href="/tournaments" className="nav-link">Tournaments</a>
              <a href="/profile" className="nav-link">Profile</a>
              <AuthButton variant="logout" className="nav-link" />
            </>
          ) : (
            <AuthButton variant="login" className="nav-link" />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;