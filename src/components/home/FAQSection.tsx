"use client";

import { useState, useRef, useEffect } from "react";

import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { Plus, Minus, Headphones } from "lucide-react";
import Link from "next/link";

const faqItems = [
  {
    question: "HOW DO I SHIP MY PRODUCTS?",
    answer: (
      <>
        Kindly schedule a drop-off of your product(s) at our office.
        <br />
        <br />
        <span className="underline text-[#1D1D1B]">BelvaPhilips Imagery,</span>
        <br />
        <span className="underline text-[#1D1D1B]">
          No 48, Adedoyin Street, Ogba.
        </span>
        <br />
        <br />
        Contact:
        {/* <br />
        <span className="text-[#1D1D1B]">Omolara - 08156744356</span> */}
        <br />
        <span className="text-[#1D1D1B]">Taiwo - 09021431136</span>
      </>
    ),
  },
  {
    question: "HOW MUCH DOES IT COST?",
    answer: (
      <>
        We have a per-image fixed pricing for each category of service (
        <span className="font-bold text-[#1D1D1B] underline">Premium</span>,{" "}
        <span className="font-bold text-[#1D1D1B] underline">High End</span>,{" "}
        <span className="font-bold text-[#1D1D1B] underline">Medium End</span>,{" "}
        <span className="font-bold text-[#1D1D1B] underline">Basic End</span>,
        etc).
        <br />
        <br />
        You can also purchase a{" "}
        <span className="font-bold text-[#1D1D1B] underline">
          membership
        </span>{" "}
        (Growth and Enterprise), which grants you a cheaper base price
      </>
    ),
  },
  {
    question: "CAN I PROVIDE REFERENCES?",
    answer:
      "Sure! We encourage all our clients to provide references to understand what result you would like to achieve.",
  },
  {
    question: "CAN I BE PRESENT DURING THE SHOOTS?",
    answer: (
      <>
        Unfortunately, no. Our production model is built around efficiency,
        remote coordination and fixed pricing.
        <br />
        <br />
        We have introduced the necessary tools to support effective online
        collaboration.
      </>
    ),
  },
  {
    question: "DO YOU ACCEPT REVISIONS",
    answer: (
      <>
        Yes! Any revisions due to Belvaphilips’ failure to follow your shooting
        directions are free of charge.
        <br />
        <br />
        Any revisions made due to unclear directions from the client which were
        open to interpretation and assumption will be paid.
      </>
    ),
  },
  {
    question: "WHAT IS THE TURNAROUND TIME?",
    answer: (
      <>
        We start shooting your project the next business day since the payment
        is made.
        <br />
        There are 2 image delivery speeds:
        <br />
        <br />
        <span className="font-semibold text-[#1D1D1B]">
          STANDARD
        </span> takes{" "}
        <span className="font-semibold text-[#1D1D1B]">8 business days</span>{" "}
        since we receive the products and the payment.
        <br />
        <br />
        <span className="font-semibold text-[#1D1D1B]">RUSH</span> takes{" "}
        <span className="font-semibold text-[#1D1D1B]">4 business days</span>{" "}
        since we receive the products and the payment. This attracts additional
        fees.
      </>
    ),
  },
  {
    question: "WHAT IS THE PAYMENT PLAN?",
    answer: "Payment plan is 100%. Payment is made before we start shooting",
  },
  {
    question: "WHAT FORMAT ARE IMAGES DELIVERED?",
    answer: (
      <>
        Standard product photos are delivered as a high resolution, 300 DPI jpeg
        using Maximum quality setting measuring 3000x3000 pixels in size.
        <br />
        <br />
        Depending on the product shape, excess white space may be cropped
        leaving the longest dimension at least 3000 pixels, while the other
        dimension is cropped to fit the shape of the product being photographed.
      </>
    ),
  },
  {
    question: "IS RETOUCHING INCLUDED?",
    answer: (
      <>
        Yes! Standard retouching is included for every image you order.
        <br />
        <br />
        Any complex manipulations such as fixing product images attract
        additional fees
      </>
    ),
  },
];

const FramedContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {/* Container with thin border */}
    <div className="relative">{children}</div>

    {/* Corner lines - top left */}
    <div className="absolute top-0 left-0 md:w-4 w-3 h-px bg-black"></div>
    <div className="absolute top-0 left-0 w-px md:h-4 h-3 bg-black"></div>

    {/* Corner lines - top right */}
    <div className="absolute top-0 right-0 md:w-4 w-3 h-px bg-black"></div>
    <div className="absolute top-0 right-0 w-px md:h-4 h-3 bg-black"></div>

    {/* Corner lines - bottom left */}
    <div className="absolute bottom-0 left-0 md:w-4 w-3 h-px bg-black"></div>
    <div className="absolute bottom-0 left-0 w-px md:h-4 h-3 bg-black"></div>

    {/* Corner lines - bottom right */}
    <div className="absolute bottom-0 right-0 md:w-4 w-3 h-px bg-black"></div>
    <div className="absolute bottom-0 right-0 w-px md:h-4 h-3 bg-black"></div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full pb-[108px] bg-white " ref={ref}>
      <div className="container mx-auto md:px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-12 md:max-w-[1050px]"
        >
          {/* Section Header */}
          <div>
            <motion.div
              variants={itemVariants}
              className="text-[#FEC845] uppercase md:text-sm text-xs mb-2"
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="md:text-[64px] text-[30px] font-semibold md:tracking-[-3px] tracking-[-1px] leading-[115%]"
            >
              GOT QUESTIONS?
              <br />
              HERE ARE ANSWERS
            </motion.h2>
          </div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FramedContainer>
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex cursor-pointer justify-between md:h-[55px] h-[45px] bg-[#F9F9F9] items-center w-full py-5 md:px-7 px-5 text-left"
                  >
                    <span className="font-semibold md:text-[20px] text-sm">
                      {item.question}
                    </span>
                    <span className="flex-shrink-0 ml-4">
                      {openIndex === index ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-[#F9F9F9]"
                      >
                        <div className="p-7 pt-2">
                          <div className="text-[#444444] md:text-lg text-sm">
                            {item.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FramedContainer>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="md:col-span-1 ">
              <Link href={"/contact"}>
                <div className="flex items-center justify-between h-[56px] py-5 md:px-6 px-4 border border-[#C9C9C9]">
                  <div className="flex items-center">
                    <Headphones className="h-6 w-6 mr-4" />
                    <span className="font-semibold md:text-base text-xs">
                      CAN’T FIND YOUR QUESTION? CHAT WITH SUPPORT
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
