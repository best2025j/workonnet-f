import { useRoute } from 'vue-router';
import moment from 'moment';

export const getActiveRoute = (routerPath: string) => {
  return useRoute().path.includes(routerPath);
};

export const getActiveRouteExact = (routerPath: string) => {
  return useRoute().path === routerPath;
};

export const abbreviateNumber = (count: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 0,
  }).format(count);
};

export const abbreviateNumberWithFraction = (count: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(count);
};

export const formatCurrency = (count: number) => {
  return new Intl.NumberFormat('en-US').format(count);
};

export const formatTime = (dateString: string) => {
  return moment(dateString).format('LT');
};

export const formatTimeDiffHuman = (dateString: string) => {
  return moment(dateString).startOf('hour').fromNow();
};

export const formateDateMonthYear = (dateString: string) => {
  return moment(dateString).format('MMMM YYYY');
};

export const formatDateSubmission = (dateString: string) => {
  return moment(dateString).format('L');
};

export function formatExperienceDates(startingFrom: string, endingIn: string) {
  if (!startingFrom) return '';

  const startDate = moment(startingFrom);
  const endDate = endingIn ? moment(endingIn) : null;

  // Check if both dates are in the same year
  if (endDate && startDate.year() === endDate.year()) {
    return `${startDate.format('MMMM')} - ${endDate.format('MMMM YYYY')}`;
  }

  return `${formateDateMonthYear(startingFrom)} - ${
    endDate ? formateDateMonthYear(endingIn) : 'PRESENT'
  }`;
}

export function formatDateForInput(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return 'th'; // Special case for 11-20
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatDateWithSuffix(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = moment(date).date();
  const month = moment(date).format('MMMM');
  const year = moment(date).format('YYYY');
  const suffix = getOrdinalSuffix(day);

  return `${day}${suffix} ${month}, ${year}`;
}

export function formatDateTime(dateString: string) {
  if (!dateString) return '';
  const dateToFormat = new Date(dateString);
  const formattedDate = moment(dateToFormat).format('YYYY-MM-DD HH:mm:ss');

  return formattedDate;
}

export function formatMonthDateForInput(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}`;
}

export const ROUTES = {
  HOME: '/home',
  MYPROFILE: '/myprofile',
  WALLET: '/wallet',
  CHALLENGES: '/challenges',

  // creator
  CREATOR_HOME: '/creator',
  CREATOR_MYPROFILE: '/myprofile',
  CREATOR_WALLET: '/creator/wallet',
  CREATOR_CHALLENGES: '/creator/challenges',

  // guest
  GUEST_HOME: '/home',
  GUEST_MYPROFILE: '/myprofile',
  GUEST_WALLET: '/wallet',
  GUEST_CHALLENGES: '/challenges',
};

export function extractDataFromRequest(data: Record<string, any>) {
  return {
    status: data.status,
    errorCode: data?.errorCode,
    message: data.message,
    data: data?.data,
  };
}

export function isNullOrEmpty(obj: any): boolean {
  return (
    obj === null ||
    (typeof obj === 'object' &&
      Object.keys(obj).length === 0 &&
      !(obj instanceof Date))
  );
}

export function convertNumToRating(num: number) {
  return (num * 5).toFixed(1);
}

export function convertNumToPercentage(num: number) {
  return (num * 100).toFixed(1) + '%';
}

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const removeEmptyKeys = (obj: Record<string, any>) => {
  return Object.entries(obj)
    .filter(([key, value]) => value != null && value !== '') // Filter out null, undefined, or empty string
    .reduce((acc, [key, value]) => {
      acc[key] = value; // Rebuild the object with filtered keys
      return acc;
    }, {} as Record<string, any>);
};
