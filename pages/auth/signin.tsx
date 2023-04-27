import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event: any) => {
    const res = await signIn("credentials", {
      callbackUrl: "/",
      email: user,
      password: password,
    });
  };
  if (status === "loading")
    return <div className="flex items-center justify-center">Loading...</div>;
  if (status === "authenticated") router.push("/");
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {status === "unauthenticated" && (
        <>
          <div className="text-3xl font-bold mb-5">Sign In</div>
          <form
            onSubmit={handleLogin}
            className="flex flex-col bg-opacity-60 w-1/5 h-1/3 items-center bg-green-400 p-10 rounded-md"
          >
            <div className="flex flex-col w-full">
              <label>Email</label>
              <div>
                <input
                  className="py-1 px-2 w-full rounded-md"
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label>Password</label>
              <div>
                <input
                  className="py-1 px-2 w-full rounded-md"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="bg-violet-800 mt-2 max-w-xs text-white w-full p-2 rounded-xl"
            >
              Login
            </button>

            <Link
              href="/register"
              className="bg-violet-950 mt-5 max-w-xs text-white text-center w-full p-2 rounded-xl"
            >
              Register
            </Link>
          </form>
        </>
      )}
    </div>
  );
}
