import Cookies from "js-cookie";

export const setToken = (key: string, value: string) => {
  Cookies.set(key, value);
};

export const getToken = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const removeToken = (key: string) => {
  Cookies.remove(key);
};
