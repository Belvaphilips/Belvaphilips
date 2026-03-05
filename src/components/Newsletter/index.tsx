"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const STORAGE_KEY = "belvaphilips_newsletter_dismissed";

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleSubmit = async () => {
    if (!email || !fullName) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          fullName: fullName.trim(),
        }),
      });

      if (response.ok || response.status === 204) {
        setStatus("success");
        setTimeout(() => {
          handleClose();
          setStatus("idle");
        }, 3000);
      } else {
        const data = await response.json();
        throw new Error(
          data?.message || "Subscription failed. Please try again."
        );
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) handleClose();
      }}
    >
      <DialogContent
        className="p-0 [&>button]:hidden overflow-hidden w-[95vw] max-w-[580px] rounded-none border-0 "
        onPointerDownOutside={
          status === "loading" ? (e) => e.preventDefault() : undefined
        }
      >
        <DialogTitle className="sr-only">
          Sign up for exclusive insights
        </DialogTitle>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-6 sm:px-10 bg-white text-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black flex items-center justify-center">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase">
              You're In!
            </h2>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Thanks for subscribing. Expect creative insights, visual direction
              notes, and case studies from Belvaphilips Imagery straight to your
              inbox.
            </p>
            <p className="text-xs text-gray-400">
              This window will close automatically…
            </p>
          </div>
        ) : (
          <div className="bg-white sm:p-7 p-4">
            <div className="relative w-full h-[180px] sm:h-[260px] bg-gray-100">
              <Image
                src="/assets/newsletter-image.png"
                alt="Belvaphilips product photography preview"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="pt-8">
              <h2 className="text-[18px] sm:text-[24px] font-semibold uppercase mb-2 leading-tight">
                Sign Up For Exclusive Insights
              </h2>
              <p className="text-[#787878] text-xs sm:text-sm mb-5 leading-relaxed">
                Opt in to receive creative insights, visual direction notes, and
                case studies from Belvaphilips Imagery.
              </p>

              {/* Fields */}
              <div className="flex flex-col gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full border border-gray-200 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-400 disabled:opacity-50"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full border border-gray-200 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-400 disabled:opacity-50"
                />
              </div>

              {(status === "error" || errorMessage) && (
                <p className="text-red-500 text-xs mb-3">{errorMessage}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="bg-black text-white text-xs sm:text-sm font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Signing up…
                    </>
                  ) : (
                    "SIGN UP"
                  )}
                </button>
                <button
                  onClick={handleClose}
                  disabled={status === "loading"}
                  className="border border-gray-300 text-xs sm:text-sm font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:border-black transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
