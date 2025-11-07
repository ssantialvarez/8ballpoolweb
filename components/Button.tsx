"use client";

import React from 'react';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

// Base button styles using Tailwind CSS
// These replace the previous CSS classes (.button, .button.login, .button.logout)
//
// Usage examples:
// <Button>Basic Button</Button>
// <Button className="bg-green-500 hover:bg-green-600">Custom Green Button</Button>
// <Button href="/some-link" className="text-sm px-4 py-2">Link Button</Button>
// <Button onClick={handleClick} className="w-full">Full Width Button</Button>
const baseButtonClasses = `
  px-7 py-4 text-lg font-semibold rounded-xl border-none cursor-pointer
  transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
  shadow-[0_8px_20px_rgba(0,0,0,0.4)] uppercase tracking-[0.08em]
  outline-none focus:shadow-[0_0_0_4px_rgba(99,179,237,0.5)]
  hover:shadow-[0_12px_25px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:scale-[1.03]
  active:translate-y-0
`;

export default function Button({
  href,
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) {
  const combinedClasses = `${baseButtonClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}