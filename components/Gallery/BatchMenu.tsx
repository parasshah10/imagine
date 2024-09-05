import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface BatchMenuProps {
  onDelete: () => void;
  onRemix: () => void;
}

export default function BatchMenu({ onDelete, onRemix }: BatchMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => {
                onRemix();
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 w-full text-left"
              role="menuitem"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Remix</span>
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 w-full text-left"
              role="menuitem"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
