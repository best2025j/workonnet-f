import { cipher, decipher } from '~/http/enc.storage';

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  let baseUrl;

  baseUrl = process.server
    ? runtimeConfig.public.API_BASE_URL
    : runtimeConfig.public.BASE_API_BROWSER_URL;

  return { baseUrl };
};

export const storageSerializer = {
  serializer: {
    read: (v: any) => (v ? JSON.parse(decipher(v)) : null),
    write: (v: any) => cipher(JSON.stringify(v)),
  },
};

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const getCountDown = (dateString: string) => {
  var countDownDate = new Date(dateString).getTime();

  // Update the count down every 1 second
  if (import.meta.client) {
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        return {
          expired: true,
        };
      }

      return {
        expired: false,
        days,
        hours,
        minutes,
        seconds,
        fullTimer: `${days}:${hours}:${minutes}:${seconds}`,
      };
    });
  }
};
