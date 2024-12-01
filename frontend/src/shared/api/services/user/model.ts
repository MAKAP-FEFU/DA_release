export interface IUser {
  id: number;
  username: string;
}

export interface ILoginBody {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}
