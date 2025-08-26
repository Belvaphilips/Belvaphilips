"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Returns() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    {
      title: "Introduction",
      content: [
        <span>
          At Belvaphilips Imagery, we understand that clients occasionally need
          to return physical products used in our photography sessions. To
          ensure a smooth process, please review our return policy below.
        </span>,
      ],
    },
    {
      title: "Return Eligibility",
      content: [
        <span>
          <span className="highlight">✅ Eligible for Return:</span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Undamaged products in original packaging.</li>
          <li>Products returned within 30 days of receipt.</li>
          <li>
            Items not used or altered during the photoshoot (unless otherwise
            agreed).
          </li>
        </ul>,

        <span>
          <span className="highlight">❌ Not Eligible for Return:</span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Products damaged during shipping to or from our studio.</li>
          <li>
            Items used, worn, or modified for photography (e.g., opened
            cosmetics, folded clothing).
          </li>
          <li>Custom-made or perishable goods.</li>
        </ul>,
      ],
    },
    {
      title: "Return Process",
      content: [
        <ol className="list-decimal space-y-6 pl-5">
          <li>
            <span className="font-medium">Request Authorization:</span> Email
            [your email] with your order number and reason for return.
          </li>
          <li>
            <span className="font-medium">Approval & Instructions:</span> We’ll
            confirm eligibility and provide a return shipping address.
          </li>
          <li>
            <span className="font-medium">Ship the Product:</span> Pack items
            securely in their original packaging and include any provided
            labels.
          </li>
          <li>
            <span className="font-medium">Refund or Credit:</span> Once received
            and inspected, we’ll process your refund or studio credit within 7
            business days.
          </li>
        </ol>,
      ],
    },
    {
      title: "Shipping & Fees",
      content: [
        <ul className="list-disc pl-5">
          <li>
            <span className="font-medium"> Client-Covered Returns:</span>
            You are responsible for return shipping costs unless the return is
            due to our error.
          </li>
          <li>
            <span className="font-medium">Restocking Fee:</span> A 10% fee may
            apply for non-defective returns (if applicable).
          </li>
        </ul>,
      ],
    },
    {
      title: "Damaged or Incorrect Items",
      content: [
        <span>
          If a product arrives damaged or is not what you sent, notify us within{" "}
          <span className="highlight">6 hours</span> with photos for a
          replacement or refund.
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
            className="md:text-[82.83px] text-[38px] md:font-semibold font-bold mb-[20px] leading-[115%] tracking-[-3px]"
          >
            PRODUCT RETURNS
          </motion.h1>

          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8 max-w-[908px]">
              {section.title !== "Introduction" && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="md:text-[28px] text-[20px] font-semibold mb-4"
                >
                  {section.title.toUpperCase()}
                </motion.h2>
              )}
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                {section.content.map((paragraph, index) => (
                  <motion.div
                    key={`${sectionIndex}-${index}`}
                    variants={paragraphVariants}
                    className="md:text-lg text-sm text-[#1D1D1B] leading-relaxed"
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
