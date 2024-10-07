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
