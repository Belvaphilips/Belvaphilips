"use client";
import { useAppDispatch } from "@/lib/redux/hooks";
import { clearUser } from "@/lib/redux/slices/userSlice";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  return window.location.origin;
};

export default function SigninComponent() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const cookies = new Cookies();
  const next = searchParams.get("next");
  const dispatch = useAppDispatch();

  const baseUrl = getBaseUrl();
  const supabase = createClient();

  const requestOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${baseUrl}/auth/callback`,
        },
      });

      if (error) throw error;

      router.push(`/otp?email=${encodeURIComponent(email)}`);
      setIsSigningIn(false);
    } catch (error) {
      console.error("Error requesting OTP:", error);
      setIsSigningIn(false);
      // TODO: Handle error appropriately
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${baseUrl}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setIsSigningIn(false);
    }
  };

  // const logout = async () => {
  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) {
  //       console.error("Error logging out:", error.message);
  //       return;
  //     }
  //     console.log("User logged out successfully");
  //     dispatch(clearUser());
  //     cookies.remove("user_token", { path: "/" });
  //   } catch (err) {
  //     console.error("Unexpected error during logout:", err);
  //   }
  // };

  return (
    <>
      {/** DESKTOP SIGNIN */}
      <div
        style={{
          backgroundImage: "url('/assets/images/background-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(212, 212, 212, 0.5)",
        }}
        className="min-h-screen lg:flex items-center justify-center bg-[#D4D4D4] hidden"
      >
        <div className="absolute inset-0 bg-[#D4D4D4] opacity-95"></div>
        <div className="text-center bg-white shadow max-w-[423px] w-full p-8 z-10">
          <div className="flex items-center gap-[3.68px] justify-center mb-[40.62px]">
            <Image
              src={"/assets/images/belvaphilips.svg"}
              width={20.28}
              height={20.12}
              alt="belvaphilips imagery"
            />
            <span
              className={`font-logo text-[15.24px] flex items-center gap-[2.45px]`}
            >
              <span className={`font-black`}>BELVAPHILIPS</span>
              <span className="font-light">IMAGERY</span>
            </span>
          </div>
          {/* <button onClick={logout}>LOGOUT</button> */}
          <div className="max-w-[300px] mx-auto text-center">
            <h1 className="text-[24px] font-semibold leading-[125%] ">
              WELCOME TO <br /> BELVAPHILIPS IMAGERY
            </h1>
            <p className="text-base mb-7 leading-[155%] mt-4 text-[#444444]">
              Let's bring your products to life with effortless, professional
              photography.
            </p>
          </div>
          <form className="space-y-5" onSubmit={requestOtp}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full outline-none bg-[#F4F4F4] px-5 h-[47px] w-full placeholder:text-[#585858]"
            />

            <button
              type="submit"
              disabled={isSigningIn}
              className="bg-[#1D1D1B] cursor-pointer text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center  font-semibold text-base "
            >
              {isSigningIn ? "Signing in..." : "Sign in "}
            </button>
          </form>
          <div className="flex items-center justify-center my-4 w-full max-w-[323px] mx-auto">
            <div className="flex-grow border-t border-[#F1F1F1]"></div>
            <span className="px-3 text-[#A9A8A8] text-base">or</span>
            <div className="flex-grow border-t border-[#F1F1F1]"></div>
          </div>

          <div className="max-w-[323px] mx-auto">
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="flex items-center cursor-pointer justify-center w-full h-[44px] border border-[#DADADA] rounded-full text-[#101010] gap-2"
            >
              <span>
                <Image
                  src={"/assets/images/google.svg"}
                  alt="google logo"
                  width={24}
                  height={24}
                />
              </span>
              {isSigningIn ? "Signing in..." : "Continue with Google"}
            </button>
          </div>
        </div>
      </div>
      {/** DESKTOP SIGNIN */}

      {/** MOBILE SIGNIN */}
      <div className="lg:hidden block pt-[68px] px-4">
        <div className="flex items-center gap-[3.68px] mb-[61.35px]">
          <Image
            src={"/assets/images/belvaphilips.svg"}
            width={30.92}
            height={23.65}
            alt="belvaphilips imagery"
          />
          <span
            className={`font-logo text-[17.92px] flex items-center gap-[2.45px]`}
          >
            <span className={`font-black`}>BELVAPHILIPS</span>
            <span className="font-light">IMAGERY</span>
          </span>
        </div>
        <div className="max-w-[300px] text-left">
          <h1 className="text-[24px] font-semibold leading-[125%] ">
            WELCOME TO <br /> BELVAPHILIPS IMAGERY
          </h1>
          <p className="text-base mb-7 leading-[155%] mt-4 text-[#444444]">
            Let's bring your products to life with effortless, professional
            photography.
          </p>
        </div>
        <form className="space-y-5" onSubmit={requestOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full outline-none bg-[#F4F4F4] px-5 h-[47px] w-full placeholder:text-[#585858]"
          />

          <button
            type="submit"
            disabled={isSigningIn}
            className="bg-[#1D1D1B] cursor-pointer text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center  font-semibold text-base "
          >
            {isSigningIn ? "Signing in..." : "Sign in "}
          </button>
        </form>
        <div className="flex items-center justify-center my-4 w-full max-w-[323px] mx-auto">
          <div className="flex-grow border-t border-[#F1F1F1]"></div>
          <span className="px-3 text-[#A9A8A8] text-base">or</span>
          <div className="flex-grow border-t border-[#F1F1F1]"></div>
        </div>

        <div className="max-w-[323px] mx-auto">
          <button
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            className="flex items-center cursor-pointer justify-center w-full h-[44px] border border-[#DADADA] rounded-full text-[#101010] gap-2"
          >
            <span>
              <Image
                src={"/assets/images/google.svg"}
                alt="google logo"
                width={24}
                height={24}
              />
            </span>
            {isSigningIn ? "Signing in..." : "Continue with Google"}
          </button>
        </div>
      </div>
      {/** MOBILE SIGNIN */}
    </>
  );
}
