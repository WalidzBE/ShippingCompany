import http from "../http-common";

const signUp = (data) => {
  console.log("data", data);
  return http.post("/account/signup", data);
};

const logIn = (data) => http.post("/account/login", data);

const logOut = () => http.post("/account/logout");

const checkAuth = () => http.get("/account/me");

const AccountService = {
  signUp,
  logIn,
  logOut,
  checkAuth,
};

export default AccountService;
