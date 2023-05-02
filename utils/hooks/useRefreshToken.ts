import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();
  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/refresh", {
        headers: {
          Authorization: "Bearer " + session?.user.refreshToken,
        },
      });
      if (session) {
        session.user.accessToken = res.data.accessToken;
        session.user.refreshToken = res.data.refreshToken;
        await update({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        });
      } else signIn();
    } catch (err) {
      signOut();
    }

    //if (session) session.user.accessToken = res.data.accessToken;
  };
  return refreshToken;
};
