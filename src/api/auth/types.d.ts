export interface AuthMeResponse extends User {}
export interface LoginResponse {
  message: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface User {
  id: number
  username: string
}