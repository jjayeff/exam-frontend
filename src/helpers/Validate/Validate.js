export const validateHTTPS = url => {
  try {
    return url ? new RegExp('https://').test(url.toLocaleLowerCase()) : false;
  } catch (error) {
    return false;
  }
};

export const validateHaveCookieName = name => {
  try {
    return name ? new RegExp(`${name}=`).test(document.cookie) : false;
  } catch (error) {
    return false;
  }
};

export const validatePassword = password => {
  try {
    return password ? new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,})$/).test(password) : false;
  } catch (error) {
    return false;
  }
};
