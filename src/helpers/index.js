
import { createCookie, getCookie, deleteCookie } from './Cookie/Cookie';
import { validateHTTPS, validateHaveCookieName, validatePassword } from './Validate/Validate';
import history from './History/History';

export {
  // cookie
  createCookie,
  getCookie,
  deleteCookie,
  // validate
  validateHTTPS,
  validateHaveCookieName,
  validatePassword,
  // history
  history,
};
