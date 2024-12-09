import { atom } from "recoil";

interface User {
  email: string | null;
  password: string | null;
}

export const authenticate = atom({
  key: "authenticate",
  default: {
    isAuthenticated: false,
    user: {
      email: null,
      password: null,
    } as User,
  },
});

export const mobileMenuOpen = atom({
  key: "mobileMenuOpen",
  default: false,
});
