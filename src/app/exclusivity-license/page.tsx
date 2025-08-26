"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ExclusivityLicense() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    {
      title: "Introduction",
      content: [
        <span>
          An exclusive license grants the licensee the sole right to use,
          manufacture, and sell a product or service.
          <br />
          The licensor, or the person or entity that owns the intellectual
          property, cannot grant the same rights to anyone else. And the
          exclusive licensee has the right to take legal action against anyone
          who infringes on their exclusive rights.
        </span>,

        <span>
          With our exclusive license, it enables the client a single license to
          use the photograph without any restrictions, which means{" "}
          <span className="text-[#1D1D1B] font-bold">Belvaphilips</span> loses
          the right to use the photograph for promotional or advertising
          purposes on any platform.
        </span>,
      ],
    },
    {
      title: "Rates for Exclusivity",
      content: [
        <ul className="list-disc pl-5 -mt-3">
          <li>
            <span className="highlight">Digital Media</span> - Up to 1 year -
            Digital Advertisement -{" "}
            <span className="text-[#1D1D1B] font-bold">
              N250,000 per picture
            </span>
          </li>
          <li>
            <span className="highlight">Digital media</span> - Up to 2 years -
            Digital Advertisement -{" "}
            <span className="text-[#1D1D1B] font-bold">
              N350,000 per picture
            </span>
          </li>
          <li>
            <span className="highlight">Advertising(Print and Display)</span> -
            Up to 1 year - Advertorial and Billboard -{" "}
            <span className="text-[#1D1D1B] font-bold">N400,000</span>
          </li>
          <li>
            <span className="highlight">Advertising(Print and Display)</span> -
            Up to 2 years - Advertorial and Billboard -{" "}
            <span className="text-[#1D1D1B] font-bold">N600,000</span>
          </li>
        </ul>,
        <span>Kindly Note</span>,
        <span>
          <span>
            <span className="text-[20px] font-medium text-[#1D1D1B]">
              Non-Exclusive License
            </span>
            <br />A non-exclusive license grants the licensee the right to use
            the intellectual property rights, but on a non-exclusive basis. That
            means that the licensor can still exploit the same intellectual
            property rights, and he/she can also allow other licensees to
            exploit the same intellectual property.
          </span>
        </span>,
      ],
    },
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
            className="md:text-[82.83px] text-[38px] md:font-semibold font-bold mb-[30px] leading-[115%] tracking-[-3px]"
          >
            EXCLUSIVITY LICENSE
          </motion.h1>

          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              {section.title !== "Introduction" && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="md:text-[24px] text-[20px] font-semibold mb-4 capitalize leading-[150%]"
                >
                  {section.title}
                </motion.h2>
              )}
              <motion.div
                className="space-y-4 max-w-3xl"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                {section.content.map((paragraph, index) => (
                  <motion.div
                    key={`${sectionIndex}-${index}`}
                    variants={paragraphVariants}
                    className="md:text-lg text-sm text-[#444444] leading-relaxed"
                  >
                    {paragraph}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
