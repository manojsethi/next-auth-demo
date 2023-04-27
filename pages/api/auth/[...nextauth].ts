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
        const user = {
          id: "999999",
          name: "J Smith",
          email: "test@example.com",
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
    jwt: async ({ token, user, account }): Promise<JWT> => {
      if (user) token.user = user;
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "thisismyrandomsecret",
  pages: {
    signIn: "/auth/signin",
  },
});
