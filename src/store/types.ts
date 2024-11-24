export  interface User {
    name: string;
    email: string;
    password: string;
    status: boolean;
}

export interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
}