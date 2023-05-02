import useAxiosInstance from "@/utils/hooks/useAxiosInstance";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [me, setMe] = useState();
  const axios = useAxiosInstance();
  useEffect(() => {
    if (status == "unauthenticated" && !session) signIn();
  }, [session, status]);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p
        className="p-5 bg-green-300 rounded-md"
        onClick={async () => {
          let airlines = await axios.get("/users");
          setMe(airlines.data);
        }}
      >
        Get My Info
      </p>
      <div className="max-w-sm break-words">
        {JSON.stringify(session?.user.accessToken)}
      </div>
      <div
        className="bg-black text-white max-w-sm break-words"
        onClick={() => signOut()}
      >
        Sign Out
      </div>
    </>
  );
}
