'use client';

import { FaSearch, FaTimes } from 'react-icons/fa';

interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export default function ProductSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Розмір (300x200) або маркування (ST40)...',
  autoFocus,
  className = '',
}: ProductSearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={`relative w-full ${className}`}
      role="search"
    >
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Пошук шамотної плити за розміром або маркуванням"
        className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Очистити пошук"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={16} />
        </button>
      )}
    </form>
  );
}
