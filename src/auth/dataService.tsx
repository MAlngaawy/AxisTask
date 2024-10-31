import Cookies from 'js-cookie';

export const BASE_HEADERS = (headers: Headers) => {
  if (Cookies.get('token')) {
    headers.set('Authorization', `Bearer ${Cookies.get('token')}`);
  }
  return headers;
};
