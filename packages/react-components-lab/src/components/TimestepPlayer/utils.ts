import { DateType } from './types';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (date: Date, dateType: DateType): string => {
  switch (dateType) {
    case 'monthly':
      return new Intl.DateTimeFormat('en-us', {
        year: 'numeric',
        month: 'long',
      }).format(date);

    case 'yearly':
      return new Intl.DateTimeFormat('en-us', {
        year: 'numeric',
      }).format(date);

    case 'daily':
      return new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }).format(date);

    default:
      return new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }).format(date);
  }
};
