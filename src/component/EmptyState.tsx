'use client';

import React from 'react';
import { LucideIcon, PackageOpen } from 'lucide-react';

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Found',
  description = 'Looks like there is nothing here yet.',
  icon: Icon = PackageOpen,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-16 text-center bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
      <div className="p-4 rounded-full bg-gray-100 ">
        <Icon className="w-10 h-10 text-gray-500" />
      </div>

      <h2 className="mt-4 text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="mt-2 text-sm text-gray-500 max-w-sm">
        {description}
      </p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-6 px-5 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
