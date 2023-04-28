import { User } from "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User {
    accessToken: string;
    refreshToken: string;
  }
}
