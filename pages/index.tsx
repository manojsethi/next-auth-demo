import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == "unauthenticated" && !session) signIn();
  }, [session, status]);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
    </>
  );
}
