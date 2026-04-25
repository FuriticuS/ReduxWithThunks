export interface User {
  id: number;
  name: string;
  email: string;
}

export interface FetchErrorPayload {
  status: number;
  message: string;
}
