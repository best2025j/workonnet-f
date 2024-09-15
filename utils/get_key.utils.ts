import { PASSPHRASE } from '../utils/common';

export const getKey = () => {
  if (import.meta.client) {
    // return process.env.NUXT_PUBLIC_PASSPHRASE || PASSPHRASE;
    return PASSPHRASE;
  }

  return null;
};
