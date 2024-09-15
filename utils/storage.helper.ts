import { cipher, decipher } from '../http/enc.storage';

function storeItem(key: string, item: any) {
  var itemString = JSON.stringify(item);
  const encripted = cipher(itemString);
  if (import.meta.client) {
    sessionStorage.setItem(key, encripted);
  }
}

function getItem(key: string) {
  if (import.meta.client) {
    if (sessionStorage.getItem(key)) {
      const deciper: string | null = sessionStorage.getItem(key);
      const data = decipher(deciper as string);
      var parsed = JSON.parse(data);
      return parsed;
    }
  }
  return '';
}

export { getItem, storeItem };
