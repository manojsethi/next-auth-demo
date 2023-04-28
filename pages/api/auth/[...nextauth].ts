import axios from "axios";
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
          const res = await axios.post(
            `https://dev-457931.okta.com/oauth2/aushd4c95QtFHsfWt4x6/v1/token?scope=offline_access&grant_type=password&username=${email}&password=${password}&client_id=0oahdhjkutaGcIK2M4x6`,
            {},
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          const user = {
            id: "999999",
            name: "J Smith",
            email: "test@example.com",
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
          };
          return user;
        } catch (error) {
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
