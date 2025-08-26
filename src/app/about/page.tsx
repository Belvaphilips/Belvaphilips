"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const paragraphs = [
    <span>
      <span className="text-[#1D1D1B] font-semibold">
        Belvaphilips (BLP) Imagery Limited
      </span>{" "}
      is a premier{" "}
      <span className="text-[#1D1D1B] font-semibold">
        advertising photography{" "}
      </span>
      agency under{" "}
      <span className="text-[#1D1D1B] font-semibold">DynamixPrime</span>—a
      trusted name in imagery and photography with over a{" "}
      <span className="text-[#1D1D1B] font-semibold">decade of expertise.</span>
    </span>,
    <span>
      We blend{" "}
      <span className="text-[#1D1D1B] font-semibold">
        artistry and strategy
      </span>{" "}
      to craft visuals that don’t just capture attention but{" "}
      <span className="text-[#1D1D1B] font-semibold">define brands.</span> Every
      project is tailored to reflect the{" "}
      <span className="text-[#1D1D1B] font-semibold">
        unique identity and vision
      </span>{" "}
      of our clients, ensuring their story stands out in a crowded marketplace.
    </span>,
    <span>
      As the{" "}
      <span className="text-[#1D1D1B] font-semibold">
        groundbreaking evolution in commercial photography,
      </span>{" "}
      BLP redefines advertising by merging{" "}
      <span className="text-[#1D1D1B] font-semibold">
        innovation with precision.
      </span>{" "}
      We transport brands into a{" "}
      <span className="text-[#1D1D1B] font-semibold">
        new dimension of visual storytelling
      </span>
      , creating striking digital media that resonates{" "}
      <span className="text-[#1D1D1B] font-semibold">globally.</span>
    </span>,
    <span>
      Our mission?{" "}
      <span className="text-[#1D1D1B] font-semibold">
        Consistent, powerful visual communication
      </span>{" "}
      that aligns with your brand’s identity and amplifies your{" "}
      <span className="text-[#1D1D1B] font-semibold">marketing goals.</span>{" "}
      Specializing in{" "}
      <span className="text-[#1D1D1B] font-semibold">
        ad campaigns and commercial photography,
      </span>{" "}
      we spotlight everything from{" "}
      <span className="text-[#1D1D1B] font-semibold">
        fashion, beauty, and fast-moving consumer goods to luxury brands
      </span>
      —transforming products into compelling narratives.
    </span>,
    <span>
      With a{" "}
      <span className="text-[#1D1D1B] font-semibold">
        proven track record across Africa
      </span>
      , we’re recognized for{" "}
      <span className="text-[#1D1D1B] font-semibold">
        creativity, excellence, and flawless execution.
      </span>
    </span>,
    <span>
      Step into a{" "}
      <span className="text-[#1D1D1B] font-semibold">
        new era of digital marketing—
      </span>
      where every image speaks volumes, and every campaign leaves a lasting
      impression.
    </span>,
    <span className="text-[#1D1D1B] font-semibold">
      Welcome to Belvaphilips.
    </span>,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const paragraphVariants = {
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
      <div className="bg-white md:pt-[100px] pt-11">
        <div className="container mx-auto px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:text-[82.83px] text-[38px] md:font-semibold font-bold  leading-[115%] tracking-[-3px]"
          >
            ABOUT US
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="flex items-center gap-[3.68px] md:mt-[70px] mt-10">
              <Image
                src={"/assets/images/belvaphilips.svg"}
                width={90.7}
                height={69.39}
                alt="belvaphilips imagery"
                className="md:block hidden"
              />
              <Image
                src={"/assets/images/belvaphilips.svg"}
                width={48.65}
                height={37.22}
                alt="belvaphilips imagery"
                className="md:hidden"
              />
              <span
                className={`font-logo md:text-[52.57px] text-[28.2px] flex items-center gap-[2.45px]`}
              >
                <span className={`font-black  `}>BELVAPHILIPS</span>
                <span className="font-light ">IMAGERY</span>
              </span>
            </span>
          </motion.div>

          <motion.div
            className="space-y-6 max-w-[908px]"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={paragraphVariants}
                className="md:text-lg text-sm text-[#444444] leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
