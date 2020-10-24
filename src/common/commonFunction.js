import commonConstant from './commonConstant';
import { createCookie, getCookie } from '../helpers';

// cookie
const createCookieLanguage = (value) =>
  value
    ? createCookie(commonConstant.cookieLanguage, value)
    : createCookie(
        commonConstant.cookieLanguage,
        commonConstant.defaultLanguage
      );
const getCookieLanguage = () =>
  getCookie(commonConstant.cookieLanguage)
    ? getCookie(commonConstant.cookieLanguage)
    : commonConstant.defaultLanguage;

export {
  // cookie
  createCookieLanguage,
  getCookieLanguage,
};
