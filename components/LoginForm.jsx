"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const login = () => {
    signIn("google", {
      callbackUrl: "https://auth-with-credentials-zeta.vercel.app/",
    });
  };


  // const handleInputChange = (e) => {
  //   setEmail(e.target.value);
  // };
  // const handleInputPassChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: e?.target?.email?.value,
        password: e?.target?.password?.value,
        redirect: false,
      });
      if (res?.error) {
        console.log(res.error);
        setError("Invalid Credentials");
        return;
      }


      router.replace("dashboard");
      e.target.reset();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-4 border-gray-900">
        <div className="flex items-center gap-4 my-3">
          <h1 className="text-xl font-bold">Login</h1>
          <Link className="text-lg border px-3 rounded-md bg-gray-700 text-white font-bold" href={'/home'}>Home</Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            // onChange={handleInputChange}
            type="email"
            name="email"
            placeholder="Email"
          // value={email}
          />
          <input
            // onChange={handleInputPassChange}
            type="password"
            placeholder="Password"
            name="password"

          // value={password}

          />
          <button className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don not have an account? <span className="underline">Register</span>
          </Link>
        </form>

        <button onClick={() => login()} className="bg-gray-900 rounded-md text-white font-bold cursor-pointer px-6 py-2">
          Google Login
        </button>
      </div>
    </div>
  );
}
