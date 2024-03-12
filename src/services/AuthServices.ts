import axios from "@axios";

const CONTROLLER_NAME = "/api/Auth";

const Register = async (param: any) => {
  const res = await axios.post(`${CONTROLLER_NAME}/Register`, param);
  return res.data;
};

const Login = async (param: any) => {
  const res = await axios.post(`${CONTROLLER_NAME}/Login`, param);

  return res.data;
};

const RefreshToken = async () => {
  let params = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
  const res = await axios.post(`${CONTROLLER_NAME}/RefreshToken`, params);
  return res.data;
};

const Logout = async () => {
  const res = await axios.post(`${CONTROLLER_NAME}/Logout`);
  return res.data;
};

const ChangePassword = async (data: any) => {
  const res = await axios.post(`${CONTROLLER_NAME}/ChangePassword`, data);
  return res.data;
};

const ForgotPassword = async (data: any) => {
  const res = await axios.post(`${CONTROLLER_NAME}/ForgotPassword`, data);
  return res.data;
};

const ResetPassword = async (data: any) => {
  const res = await axios.post(`${CONTROLLER_NAME}/ResetPassword`, data);
  return res.data;
};

const VerifyUserToken = async (params: any) => {
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/VerifyUserToken`, {
      params,
    });
    return res.data;
  } catch (error) {
    return false;
  }
};

const AuthService = {
  Register,
  Login,
  RefreshToken,
  Logout,
  ForgotPassword,
  ChangePassword,
  ResetPassword,
  VerifyUserToken,
};
export default AuthService;
