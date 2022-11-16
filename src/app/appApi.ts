import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
  /*baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',*/
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
});

// api
export const authAPI = {
  register(data: RegisterDataType) {
    return instance.post<RegisterDataType, AxiosResponse<ResponseRegisterType>>('/auth/register', data);
  },
  login(data: LoginParamsType) {
    return instance.post<ResponseLoginType>(`/auth/login`, data);
  },
  me() {
    return instance.post<AuthMeResponseType>('/auth/me', {});
  },
  logout() {
    return instance.delete(`/auth/me`, {});
  },
};

// types
export type UserDataType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  token?: string;
};
export type RegisterDataType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type ResponseLoginType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};

export type ResponseRegisterType = {
  addedUser: {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
  };
  error?: string;
};
export type AuthMeResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number; // количество колод
  token: string;

  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;

  error?: string;
};
