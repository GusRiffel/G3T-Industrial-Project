import Cookies from 'js-cookie';

export const getCookie = () => {
  const cookie = Cookies.get("auth");
  if (cookie) {
    const cookieDecoded = JSON.parse(decodeURIComponent(cookie));
    return cookieDecoded;
  }
};

export const createCookie = (data) => {
  Cookies.set("auth", JSON.stringify(data));
};

export const removeCookie = () => {
  Cookies.remove("auth");
};