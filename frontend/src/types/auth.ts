export interface User {
  name: string;
  email: string;
  role: "ADMIN" | "CLIENT";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: "ADMIN" | "CLIENT" | undefined;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export type LoginDto = {
  email: string;
  password: string;
};
