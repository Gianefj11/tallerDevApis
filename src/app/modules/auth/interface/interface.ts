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