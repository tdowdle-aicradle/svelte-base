import { APIENDPOINT } from "./api/api";

function deleteCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const nonCacheRoutes = ["/logout", "/", "/login"];

function getCookie(name: string) {
  name = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    c = c.trimLeft();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function cookieToLocalStorage(name: string) {
  const cookie = getCookie(name);
  deleteCookie(name);
  if (cookie) {
    localStorage.setItem(name, cookie);
  }
}

export function decodeJwt(token: string) {
  if (!token || token.trim() === "") {
    return {};
  }
  const data = token.split(".")[1];
  const decoded = atob(data);

  return JSON.parse(decoded);
}

export function getUser() {
  cookieToLocalStorage("accessToken");
  cookieToLocalStorage("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? decodeJwt(accessToken) : { exp: 0 }; //If no access token return an expired empty user
}

export function isSessionExpired(user: any) {
  // Note: Back end will need to validate user session on calls for security
  return user ? user.exp * 1000 < new Date().getTime() : true;
}

export function validateUserSession() {
  const session = {
      valid: true,
      user: null
    },
    user = getUser();

  if (isSessionExpired(user)) {
    session.valid = false;
  } else {
    session.user = user;
  }
  return session;
}

export function getUserSession() {
  return new Promise((resolve, reject) => {
    const session = validateUserSession();

    if (!session.valid) {
      const currentPath = window.location.pathname;
      if (nonCacheRoutes.indexOf(currentPath) < 0) {
        localStorage.setItem("routeCache", currentPath);
      }
      location.href = `${APIENDPOINT}/login`;
    } else {
      resolve(session.user);
    }
  });
}
