import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email and Password",
      credentials: {},
      type: "credentials",
      authorize: async (credentials, req) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const res = await axiosInstance.post(
            `/auth/signin`,
            {
              email,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          return res.data;
        } catch (err) {
          const error = err as AxiosError;
          if (error.response) {
            throw new Error((error.response.data as any).message);
          } else {
            throw new Error(error.message);
          }
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
    jwt: async ({ token, user, account, session, trigger }): Promise<JWT> => {
      if (user) token.user = user;
      if (trigger === "update" && session) {
        if (session.accessToken) {
          token.user.accessToken = session.accessToken;
        }
        if (session.accessToken) {
          token.user.refreshToken = session.refreshToken;
        }
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret:
    "3cc80b75056bd4ab892c977d6b9f7bd2bab0d52e487254463522a09e6f116c1b69a1d8f31ea5100e2efbffc2840f43d1",
  pages: {
    signIn: "/auth/signin",
  },
});
