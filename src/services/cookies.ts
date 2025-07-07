import Cookies from "js-cookie";

const ID_TOKEN_KEY = import.meta.env.VITE_TOKEN_NAME || 'JWT-TOKEN';
console.log(ID_TOKEN_KEY);

/**
 * @description get token from cookies
 */
export const getToken = (): string | null => {
  return Cookies.get(ID_TOKEN_KEY) || null;
};

/**
 * @description save token into cookies
 * @param token: string
 */
export const saveToken = (token: string): void => {
  Cookies.set(ID_TOKEN_KEY, token, { expires: 1, secure: true, sameSite: 'Strict' }); // Token akan disimpan selama 7 hari
};

/**
 * @description remove token from cookies
 */
export const destroyToken = (): void => {
  Cookies.remove(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
