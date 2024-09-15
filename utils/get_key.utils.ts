import { PASSPHRASE } from '../utils/constants.utils';

export const getKey = () => {
  if (process.client) {
    // return process.env.NUXT_PUBLIC_PASSPHRASE || PASSPHRASE;
    return PASSPHRASE;
  }

  return null;
};
