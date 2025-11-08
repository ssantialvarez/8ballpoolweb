"use client";

import Button from './Button';

interface AuthButtonProps {
  variant: 'login' | 'logout' | 'signup';
  className?: string;
}

// Button variant styles using Tailwind CSS
// These replace the previous CSS classes (.button.login, .button.logout)
// You can override these styles by passing additional className props
const variantClasses = {
  login: 'bg-blue-400 text-gray-900 hover:bg-blue-500',
  logout: 'bg-red-600 text-white hover:bg-red-700',
  signup: 'bg-green-400 text-gray-900 hover:bg-green-500',
};

export default function AuthButton({ variant, className = '' }: AuthButtonProps) {
  const href = variant === 'login'
    ? "/auth/login?returnTo=/dashboard"
    : variant === 'signup'
    ? "/auth/login?screen_hint=signup&returnTo=/dashboard"
    : "/auth/logout";

  return (
    <Button
      href={href}
      className={`${variantClasses[variant]} ${className}`.trim()}
    >
      {variant === 'login' ? 'Log In' : variant === 'signup' ? 'Sign Up' : 'Log Out'}
    </Button>
  );
}