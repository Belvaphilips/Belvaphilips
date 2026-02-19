"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const pricingOptions = [
  {
    title: "Basic End Finish",
    description: "From ₦25,000/image",
    image: "/assets/pricing/basic.png",
  },
  // {
  //   title: "Medium End Finish",
  //   description: "From ₦44,000/image",
  //   image: "/assets/pricing/medium.png",
  // },
  {
    title: "High End Finish",
    description: "From ₦65,000/image",
    image: "/assets/pricing/high-2.jpg",
  },
  {
    title: "Premium Finish",
    description: "From ₦150,000/image",
    image: "/assets/pricing/premium.png",
  },
];

const PricingSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/pricing"
    ) {
      e.preventDefault();
      const element = document.getElementById("membership-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section className="w-full py-[30px] bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="md:space-y-11 space-y-5"
        >
          {/* Section Header */}
          <div className="max-w-3xl">
            <motion.h2
              variants={itemVariants}
              className="md:text-[64px] text-[30px] font-semibold mb-0 md:tracking-[-3px] leading-[-1px]"
            >
              PRICING MADE SIMPLE
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="md:text-lg text-sm font-medium md:font-normal text-[#444444] -mt-1"
            >
              Clear and Affordable Pricing
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row gap-[25px]">
            <motion.div
              variants={itemVariants}
              className="w-full md:w-2/3 border border-gray-200 p-4 md:p-7"
            >
              <h3 className="md:text-[28px] text-base font-medium md:mb-3 mb-2">
                PER-IMAGE FIXED PRICING
              </h3>
              <p className="text-[#787878] max-w-[537px] mb-8 text-xs md:text-base">
                We offer fixed per-image pricing based on your selected service
                tier, while also allowing for remote coordination.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {pricingOptions.map((option, index) => (
                  <motion.div
                    key={option.title}
                    variants={itemVariants}
                    custom={index + 2}
                    className="flex flex-col"
                  >
                    <div className="relative h-[183px] max-w-[158px] w-full mb-3 overflow-hidden">
                      <Image
                        src={option.image}
                        alt={option.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h4 className="font-medium text-xs md:text-base">
                      {option.title}
                    </h4>
                    <p className="text-[#787878] text-sm">
                      {option.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Membership */}
            <motion.div
              variants={itemVariants}
              className="w-full md:w-1/3 border border-gray-200 md:p-7 p-4"
            >
              <h3 className="md:text-[28px] text-base font-medium md:mb-3 mb-2">
                MEMBERSHIP
              </h3>
              <p className="text-[#787878] mb-8 md:text-base text-xs">
                For businesses and professionals needing frequent edits, we also
                provide membership plans.
              </p>

              <div className="md:h-[195px] h-[128.87px] w-full overflow-hidden relative">
                <div className="absolute top-0 inset-0 bg-gradient-to-br from-[#FEC845] to-black"></div>

                <div className="absolute flex flex-col justify-end py-0 md:px-6 px-3 pt-[11px] right-0 top-0 text-white">
                  <h4 className="md:text-[29.54px] text-[19.52px] font-black text-right">
                    Up to{" "}
                    <span className="md:text-[34px] text-[22.47px]">25%</span>
                  </h4>
                  <p className="md:text-[29.54px] text-[19.52px] font-black mb-4 text-right">
                    per image savings!
                  </p>
                </div>
                <div className="flex justify-end absolute left-5 md:bottom-[23.5px] bottom-3 md:text-base text-xs">
                  <Link
                    href="/pricing#membership-section"
                    onClick={handleLinkClick}
                    aria-label="Explore membership plans and scroll to membership section"
                    className="inline-flex items-center text-white hover:underline"
                  >
                    Explore membership plans
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
