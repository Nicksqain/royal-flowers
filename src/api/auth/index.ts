import api from "@/api";
import { AxiosResponse } from "axios";
import { AuthMeResponse, LoginParams, LoginResponse } from "./types";

export const fetchAuthMe = () =>
  api.get<any, AxiosResponse<AuthMeResponse>>(`/auth/me`).then((response) => response.data);

export const login = (params: LoginParams) =>
  api.post<LoginParams, AxiosResponse<LoginResponse>>(`/auth/login`, params).then((response) => response.data);

export const logout = () => api.post(`/auth/logout`);