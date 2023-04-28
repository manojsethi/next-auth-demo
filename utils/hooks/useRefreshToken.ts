import { signIn, useSession } from "next-auth/react";
import { axiosInstance } from "../axios";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await axiosInstance.post("/auth/refresh", {
      refresh: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.accessToken;
    if (session)
      update({
        ...session,
        user: {
          ...session.user,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        },
      });
    else signIn();
  };
  return refreshToken;
};
