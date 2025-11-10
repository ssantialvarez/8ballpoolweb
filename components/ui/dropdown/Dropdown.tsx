'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

export interface DropdownOption {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger';
}

interface DropdownProps {
  options: DropdownOption[];
  buttonClassName?: string;
}

export default function Dropdown({ options, buttonClassName = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (option: DropdownOption) => {
    option.onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${buttonClassName}`}
        aria-label="Options"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <ul className="py-1">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                    option.variant === 'danger'
                      ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {option.icon && <span>{option.icon}</span>}
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
