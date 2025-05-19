export interface User {
  name: string;
  email: string;
  isVerified:boolean;
  role: "ADMIN" | "CLIENT";
}

export interface AuthState {
  
}

export interface AuthContextType{
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
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
