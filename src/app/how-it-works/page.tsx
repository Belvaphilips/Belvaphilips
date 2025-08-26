"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import FAQSection from "@/components/home/FAQSection";
import GetStartedModal from "@/components/getStartedModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Process steps data
const processSteps = [
  {
    number: "01.",
    title: "REQUEST A QUOTE",
    description: (
      <>
        You can either fill a quick 5 minute brief, book a call with us or
        select your product and shoot type to get a quote
      </>
    ),
    cta: {
      text: "GET STARTED",
      link: "/get-started",
    },
  },
  {
    number: "02.",
    title: "REVIEW & CONFIRM",
    description: (
      <>
        We'll send you a quote. Once confirmed and paid, you're all set to
        proceed.
      </>
    ),
  },
  {
    number: "03.",
    title: "SHIP YOUR PRODUCT",
    description: (
      <>
        Drop off your product at our studio:
        <br />
        No 48, Adedoyin Street, Ogba
        <br />
        Omolara: 08156744356
        <br />
        Taiwo: 09021431136
      </>
    ),
  },
  {
    number: "04.",
    title: "SHOOT BEGINS",
    description: (
      <>
        Once we receive your product and payment, the shoot begins.
        <br />
        Standard turnaround:
        <span className="font-semibold text-[#1D1D1B]"> 7 business days</span>
        <br />
        Rush option:
        <span className="font-semibold text-[#1D1D1B]"> 4 business days</span>
      </>
    ),
  },
  {
    number: "05.",
    title: "REVIEW & REVISIONS",
    description: (
      <>
        We'll send you high quality previews. Need a tweak? We got you:
        <br />
        <br />
        If it's our fault: Free
        <br />
        <span className="font-semibold text-[#1D1D1B]">
          {" "}
          If it's unclear instruction:{" "}
          <span className="underline">Extra charge</span>
        </span>
      </>
    ),
  },
  {
    number: "06.",
    title: "FINAL DELIVERY",
    description: (
      <>You get high-resolution JPEGs (3000×3000px, 300DPI) ready for use.</>
    ),
  },
  {
    number: "07.",
    title: "PRODUCT RETURN",
    description: <>We'll arrange the return of your product.</>,
  },
];

const HowItWorksPage = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <div className="md:pt-[100px] bg-white pt-9" ref={ref}>
        <div className="container mx-auto px-4 pt-16 pb-20">
          <motion.h1
            className="md:text-[82.83px] text-[38px] leading-[115%] md:tracking-[-3px] tracking-[-1px] font-semibold mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            HOW IT WORKS
          </motion.h1>

          {/* Main process grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border-[0.5px] border-[#C9C9C9] md:p-6 p-4 relative flex flex-col"
              >
                <h2 className="md:text-[46.74px] text-[36px] text-[#A0A0A0] leading-[115%] font-semibold mb-1">
                  {step.number}
                </h2>
                <h3 className="md:text-[26px] text-[18px] font-semibold md:mb-4 mb-3 md:max-w-[144px] leading-[115%]">
                  {step.title}
                </h3>
                <p
                  className={`text-gray-700 mb-5 flex-grow whitespace-pre-line md:text-lg text-sm`}
                >
                  {step.description}
                </p>

                {step.cta && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white w-[144px] h-[38px] inline-flex items-center justify-center rounded-full text-sm font-bold mt-auto self-start text-[#1D1D1B] cursor-pointer"
                  >
                    {step.cta.text}
                  </button>
                )}
              </motion.div>
            ))}

            {/* Membership Card */}
            <motion.div
              variants={itemVariants}
              className="w-full  border border-gray-200 md:p-7 p-5"
            >
              <h3 className="md:text-[28px] text-lg font-medium mb-3">
                MEMBERSHIP
              </h3>
              <p className="text-[#787878] mb-6 text-sm md:text-base">
                For businesses and professionals needing frequent edits, we also
                provide membership plans.
              </p>

              <div className="h-[149px] w-full overflow-hidden relative">
                <div className="absolute top-0 inset-0 bg-gradient-to-br from-[#FEC845]  to-black"></div>

                <div className="absolute  flex flex-col justify-end py-0 px-6 pt-[11px] right-0 top-0 text-white">
                  <h4 className="md:text-[22.66px] text-[19.52px] leading-[145%] font-black text-right">
                    Up to{" "}
                    <span className="md:text-[26px] text-[22.47px]">25%</span>
                  </h4>
                  <p className="md:text-[22.66px] text-[19.52px] font-black mb-4 text-right">
                    per image savings!
                  </p>
                </div>
                <div className="flex justify-end absolute left-5 md:bottom-[23.5px] bottom-3">
                  <Link
                    href="/pricing#membership-section"
                    className="inline-flex items-center text-white hover:underline md:text-base text-xs"
                  >
                    Explore membership plans
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="px-4 md:px-0">
          <FAQSection />
        </div>

        <GetStartedModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
      <Footer />
    </>
  );
};

export default HowItWorksPage;
