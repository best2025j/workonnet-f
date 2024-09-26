import { getItem } from '../utils/storage.helper';

type AuthHeader = { Authorization?: string };
export default function authHeader(): AuthHeader {
  let user: { rsa: string | undefined } = getItem(STORAGE_TOKEN_KEY);

  if (user && user.rsa) {
    return { Authorization: 'Bearer ' + user.rsa };
  } else {
    return {};
  }
}
