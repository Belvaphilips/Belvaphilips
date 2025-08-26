"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ShippingPolicy() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    {
      title: "Shipping Responsibilities",
      content: [
        <span>
          <span className="font-medium text-[#1D1D1B]">
            Clients are responsible for:
          </span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Safely packaging products for transit to our studio</li>
          <li>Including all necessary components for photography</li>
          <li>
            Providing prepaid return shipping labels (if return shipping is
            required)
          </li>
          <li>Insuring shipments for full replacement value</li>
        </ul>,
        <span>
          <span className="font-medium text-[#1D1D1B]">Our studio will:</span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Provide shipping address upon project confirmation</li>
          <li>Notify client immediately upon receipt of damaged shipments</li>
          <li>Store products securely while in our possession</li>
        </ul>,
      ],
    },
    {
      title: "Shipping Methods & Requirements",
      content: [
        <span>
          <span className="font-medium text-[#1D1D1B]">
            Required shipping standards:
          </span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Double-box fragile items.</li>
          <li>Use adequate cushioning materials</li>
          <li>Seal packages securely with reinforced tape</li>
          <li>Include packing list inside package</li>
        </ul>,
      ],
    },
    {
      title: "Shipping Timelines",
      content: [
        <span>
          <span className="font-medium text-[#1D1D1B]">
            Client must ship products to arrive:
          </span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>At least 2 business days before scheduled shoot date</li>
          <li>By 10:00 AM on arrival date (for time-sensitive projects)</li>
        </ul>,

        <span>
          <span className="font-medium text-[#1D1D1B]">
            Our return shipping schedule:
          </span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Products shipped back within 2 business days after</li>
          <li>Final image approval, or</li>
          <li>Client's return shipping request</li>
        </ul>,
      ],
    },
    {
      title: "Shipping Costs & Fees",
      content: [
        <span>
          <span className="font-medium text-[#1D1D1B]">
            Client bears all shipping costs including:
          </span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Outbound shipping to our studio</li>
          <li>Return shipping to client</li>
          <li>Any special handling fees</li>
        </ul>,
      ],
    },
    {
      title: "Damage & Loss Policy",
      content: [
        <span>
          <span className="font-medium text-[#1D1D1B]">Client must:</span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Photograph packaging before shipping as documentation</li>
          <li>Retain all original packaging materials</li>
          <li>Notify carrier immediately of any transit damage</li>
        </ul>,
      ],
    },
    {
      title: "Tracking & Notifications",
      content: [
        <span>
          <span className="font-medium text-[#1D1D1B]">Client must:</span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Provide tracking numbers for all incoming shipments</li>
          <li>Notify us of special delivery instructions</li>
          <li>Notify carrier immediately of any transit damage</li>
        </ul>,
        <span>
          <span className="font-medium text-[#1D1D1B]">We will:</span>
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>Confirm receipt via email within 2 hours of delivery</li>
          <li>Provide tracking information for return shipments</li>
          <li>Notify client of any shipping delays</li>
        </ul>,
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
            SHIPPING POLICY
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
