"use client";

interface AuthButtonProps {
  variant: 'login' | 'logout';
}

export default function AuthButton({ variant }: AuthButtonProps) {
  if (variant === 'login') {
    return (
      <a
        href="/auth/login?returnTo=/dashboard"
        className="button login"
      >
        Log In
      </a>
    );
  }

  return (
    <a
      href="/auth/logout"
      className="button logout"
    >
      Log Out
    </a>
  );
}