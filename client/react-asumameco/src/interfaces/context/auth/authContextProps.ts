import { User } from "./user";

export interface authContextProps {
  user: User | null;
  isAuth: boolean;
  errors: string[];
  isEmailValid: boolean;
  isLoading: boolean;
  signIn: (data: FormData) => Promise<User | null>;
  signOut: () => Promise<{ message: string }>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    token: string
  ) => Promise<void>;
  preRegister: (data: FormData) => Promise<{ message: string }>;
  updateUser: (id: number, data: FormData) => Promise<any>;
}
