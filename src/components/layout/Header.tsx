"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import { usePathname, useRouter } from "next/navigation";
import GetStartedModal from "../getStartedModal";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { clearUser, setUser } from "@/lib/redux/slices/userSlice";
import { createClient } from "@/lib/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const { userId, email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const cookies = new Cookies();
  const pathname = usePathname();
  const router = useRouter();

  const specialPaths = ["/team", "/blog", "/contact"];

  const hiddenHeaderPaths = [
    "/signin",
    "/auth",
    "auth/callback",
    "/otp",
    "/admin",
  ];

  const shouldHideHeader = hiddenHeaderPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  const supabase = createClient();

  const checkAuthAndUpdateStore = async (showLoading = true) => {
    try {
      if (showLoading) {
        setAuthLoading(true);
      }
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      console.log("Header: Auth check result:", { user: !!user, error });

      if (user && !error) {
        dispatch(
          setUser({
            userId: user.id,
            email: user.email || "",
          })
        );
      } else {
        dispatch(clearUser());
      }
    } catch (err) {
      console.error("Header: Error checking auth:", err);
      dispatch(clearUser());
    } finally {
      if (showLoading) {
        setAuthLoading(false);
      }
    }
  };

  useEffect(() => {
    checkAuthAndUpdateStore();
    if (!userId) {
      checkAuthAndUpdateStore();
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          dispatch(
            setUser({
              userId: session.user.id,
              email: session.user.email || "",
            })
          );
          setAuthLoading(false);
        } else if (event === "SIGNED_OUT" || !session) {
          dispatch(clearUser());
          setAuthLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch, supabase, userId]);

  const handleUserLogout = async () => {
    try {
      setAuthLoading(true);
      await supabase.auth.signOut();
      dispatch(clearUser());
      cookies.remove("user_token", { path: "/" });
      router.push("/signin");
    } catch (err) {
      console.error("Header: Error during logout:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  const routeToDashboard = () => {
    router.push("/dashboard");
    setIsMenuOpen(false);
  };

  const logout = async () => {
    await handleUserLogout();
  };

  const renderAuthSection = () => {
    if (authLoading) {
      return (
        <div className="w-[84px] h-[40px] flex items-center justify-center rounded-full bg-gray-200 animate-pulse">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
        </div>
      );
    }

    if (userId) {
      // User is authenticated
      return (
        <HoverCard openDelay={0} closeDelay={200}>
          <HoverCardTrigger asChild>
            <Link href={"/dashboard"}>
              <button className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#EBEBEB] cursor-pointer">
                <Image
                  src={"/assets/images/user-avatar.svg"}
                  width={19.5}
                  height={19.5}
                  alt="Profile"
                />
              </button>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent
            className="!max-w-[200px] space-y-2"
            side="bottom"
            align="center"
          >
            <div className="text-sm text-gray-600 flex items-center truncate">
              {email}
            </div>
            <button
              onClick={logout}
              className="flex items-center text-sm gap-1 cursor-pointer"
            >
              Logout
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 11.75C9.95093 12.9846 8.92207 14.0329 7.54373 13.9992C7.22307 13.9913 6.82673 13.8796 6.03408 13.656C4.12641 13.1179 2.47037 12.2135 2.07304 10.1877C2 9.81533 2 9.39627 2 8.5582V7.4418C2 6.60374 2 6.1847 2.07304 5.81231C2.47037 3.78643 4.12641 2.8821 6.03408 2.34402C6.82673 2.12042 7.22307 2.00863 7.54373 2.00079C8.92207 1.96707 9.95093 3.01538 10 4.25"
                    stroke="#C23B3B"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 8.00016H6.66663M14 8.00016C14 7.53336 12.6704 6.66118 12.3333 6.3335M14 8.00016C14 8.46696 12.6704 9.33916 12.3333 9.66683"
                    stroke="#C23B3B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </HoverCardContent>
        </HoverCard>
      );
    }

    // User is not authenticated
    return (
      <Link
        href="/signin"
        className="rounded-full font-medium text-sm uppercase w-[84px] h-[40px] flex items-center justify-center text-[#1D1D1B] bg-[#EBEBEB]"
      >
        log in
      </Link>
    );
  };

  if (shouldHideHeader) {
    return null;
  }

  return (
    <header className="w-full bg-white fixed left-0 right-0 z-[20] lg:py-[30.63px] py-6 lg:border-b lg:border-[#E0E0E0] max-w-[1800px] mx-auto">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-[3.68px] hidden lg:flex"
        >
          <Image
            src={"/assets/images/belvaphilips.svg"}
            width={40.18}
            height={30.74}
            alt="belvaphilips imagery"
          />
          <span
            className={`font-logo text-[23.29px] flex items-center gap-[2.45px]`}
          >
            <span className={`font-black`}>BELVAPHILIPS</span>
            <span className="font-light ">IMAGERY</span>
          </span>
        </Link>
        {/* Mobile Logo */}
        <Link
          href="/"
          className="flex items-center gap-[3.68px] block lg:hidden"
        >
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
            <span className="font-light ">IMAGERY</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex space-x-10 text-sm uppercase">
          <Link
            href="/"
            className={`font-medium hover:text-gray-600 ${
              pathname === "/" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className={`font-medium hover:text-gray-600 ${
              pathname.startsWith("/portfolio")
                ? "text-[#1D1D1B] "
                : "text-[#6E6E6E]"
            }`}
          >
            Portfolio
          </Link>
          <Link
            href="/how-it-works"
            className={`font-medium hover:text-gray-600 ${
              pathname === "/how-it-works"
                ? "text-[#1D1D1B] "
                : "text-[#6E6E6E]"
            }`}
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className={`font-medium hover:text-gray-600 ${
              pathname === "/pricing" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
            }`}
          >
            Pricing
          </Link>

          <HoverCard openDelay={0} closeDelay={200}>
            <HoverCardTrigger asChild>
              <button
                className={`font-medium cursor-pointer hover:text-[#1D1D1B] uppercase flex items-center ${
                  specialPaths.includes(pathname)
                    ? "text-[#1D1D1B]"
                    : "text-[#6E6E6E]"
                }`}
              >
                More
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent
              className="w-[353px] p-0 rounded-3xl shadow-lg border-[0.5px] border-[#C9C9C9]"
              sideOffset={20}
              alignOffset={-50}
              side="bottom"
              align="start"
            >
              <div className="p-5">
                {/* Team Section */}
                <Link
                  href="/team"
                  className="flex items-center border-b pb-[20px] border-gray-200 group mb-5"
                >
                  <div className="mr-4 h-[43px] w-[46px] overflow-hidden">
                    <Image
                      src="/assets/images/team-thumbnail.png"
                      alt="Team"
                      width={46}
                      height={43}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="">
                      <h3 className="text-sm font-medium mb-1 text-[#1D1D1B]">
                        TEAM
                      </h3>
                      <p className="text-[#787878] text-xs">
                        Meet the passionate individuals behind our brand.
                      </p>
                    </div>

                    <div>
                      {" "}
                      <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </Link>

                {/* Blog Section */}
                <Link
                  href="/blog"
                  className="flex items-center border-b pb-5 border-gray-200 group"
                >
                  <div className="mr-4 h-[43px] w-[46px] overflow-hidden">
                    <Image
                      src="/assets/images/blog-thumbnail.png"
                      alt="Blog"
                      width={46}
                      height={43}
                      className="object-cover"
                    />
                  </div>
                  <div className=" flex items-center ">
                    <div>
                      <h3 className="text-sm font-semibold mb-1 text-[#1D1D1B]">
                        BLOG
                      </h3>
                      <p className="text-[#787878] text-xs">
                        Insights, updates, and inspiration just for you.
                      </p>
                    </div>
                    <div>
                      <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </Link>

                {/* Contact Us Section */}
                <Link href="/contact" className="flex items-center py-5 group">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-1 text-[#1D1D1B]">
                      CONTACT US
                    </h3>
                    <p className="text-[#787878] text-xs">
                      Have questions? We're here to help!
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-black transition-colors" />
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex space-x-3 items-center">
          {renderAuthSection()}

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-[144px] h-[38px] flex items-center cursor-pointer justify-center bg-[#1D1D1B] text-white rounded-full uppercase text-sm font-semibold"
          >
            GET STARTED
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-white pt-8 pb-1"
        >
          <div className="container mx-auto px-5 flex flex-col space-y-8">
            <Link
              href="/"
              className={`font-medium hover:text-gray-600 text-[22px] uppercase ${
                pathname === "/" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/portfolio"
              className={`font-medium hover:text-gray-600 text-[22px] uppercase ${
                pathname.startsWith("/portfolio")
                  ? "text-[#1D1D1B] "
                  : "text-[#6E6E6E]"
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="/how-it-works"
              className={`font-medium hover:text-gray-600 text-[22px] uppercase ${
                pathname === "/how-it-works"
                  ? "text-[#1D1D1B] "
                  : "text-[#6E6E6E]"
              }`}
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className={`font-medium hover:text-gray-600 text-[22px] uppercase ${
                pathname === "/pricing" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/team"
              className={`font-medium hover:text-gray-600 uppercase text-[22px]  ${
                pathname === "/team" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Team
            </Link>
            <Link
              href="/blog"
              className={`font-medium hover:text-gray-600 uppercase text-[22px]  ${
                pathname === "/blog" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`font-medium hover:text-gray-600 uppercase text-[22px]  ${
                pathname === "/contact" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-3">
              {authLoading ? (
                <div className="w-full h-[40px] flex items-center justify-center rounded-full bg-gray-200 animate-pulse">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>
              ) : userId ? (
                <button
                  onClick={routeToDashboard}
                  className="rounded-full font-medium text-sm uppercase w-full h-[40px] flex items-center justify-center text-[#1D1D1B] bg-[#EBEBEB]"
                >
                  My Profile
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="rounded-full font-medium text-sm uppercase w-full h-[40px] flex items-center justify-center text-[#1D1D1B] bg-[#EBEBEB]"
                >
                  sign up
                </Link>
              )}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="bg-[#1D1D1B] text-white rounded-full uppercase w-full h-[40px] flex items-center justify-center text-sm font-semibold"
              >
                GET STARTED
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <GetStartedModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
};

export default Header;
