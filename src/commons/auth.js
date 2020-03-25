import decode from "jwt-decode";
const JWT = "store_token_id";

const setToken = token => {
  localStorage.setItem(JWT, token);
};
const getToken = () => {
  return localStorage.getItem(JWT);
};
const isLogin = () => {
  const jwToken = getToken();
  return !!jwToken && !isTokenExpired(jwToken);
};
const isTokenExpired = token => {
  try {
    const _info = decode(token);
    if (_info.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};
const getUser = () => {
  const jwToken = getToken();
  //console.log("isLogin :", isLogin());
  if (isLogin()) {
    const user = decode(jwToken);
    //console.log("getUser :", user);
    return user;
  } else {
    return null;
  }
};

const logout = () => {
  localStorage.removeItem(JWT);
};

global.auth = {
  setToken,
  isLogin,
  getToken,
  getUser,
  logout
};
