import { PASSPHRASE } from '../utils/common';

export const getKey = () => {
  if (import.meta.client) {
    return PASSPHRASE;
  }

  return null;
};
