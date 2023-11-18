export interface User {
    username: string
    email?: string;
    password: string;
}

export interface Login {
    refresh: string;
    access: string;
    user: User;
}

export interface Dev {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  years: number;
  country: string;
}
