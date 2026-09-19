import { ApplicationStatus } from '../../types';

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case 'New':
      case 'Received':
      case 'In Progress':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-900';
      case 'Under Review':
      case 'Waiting for Customer':
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      case 'Completed':
        return 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white font-bold';
      case 'Rejected':
      case 'Cancelled':
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-3.5 py-1.5 text-sm font-medium';
      case 'md':
      default:
        return 'px-2.5 py-1 text-xs font-medium';
    }
  };

  return (
    <span
      id={`status-badge-${status.toLowerCase().replace(/\s+/g, '-')}`}
      className={`inline-flex items-center gap-1.5 rounded-full border ${getStyles()} ${getSizeClasses()} tracking-wide whitespace-nowrap`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}
