"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    {
      title: "Introduction",
      content: [
        <span>
          At{" "}
          <span className="text-[#1D1D1B] font-semibold">
            Belvaphilips Imagery,
          </span>{" "}
          we are committed to protecting your privacy and ensuring the security
          of your personal information. This Privacy Policy outlines how we
          collect, use, disclose, and safeguard your data when you engage with
          our product photography services. By using our services, you agree to
          the terms outlined in this policy.
        </span>,
      ],
    },
    {
      title: "1. Information We Collect",
      content: [
        <span className="">
          We may collect the following types of information:
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            <span className="highlight">Personal Information:</span> Name, email
            address, phone number, business name, and billing details.
          </li>
          <li>
            <span className="highlight">Project Details:</span> Information
            about your products, branding guidelines, and project requirements.
          </li>
          <li>
            <span className="highlight">Payment Information:</span> Credit card
            details or other payment information (processed securely via
            third-party processors).
          </li>
          <li>
            <span className="highlight">Website Usage Data:</span> Cookies, IP
            addresses, and browsing behavior when you visit our website.
          </li>
        </ul>,
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        <span>We use your information for the following purposes:</span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            To provide and deliver our{" "}
            <span className="highlight">photography services</span>.
          </li>
          <li>
            To communicate with you regarding projects, invoices, and updates.
          </li>
          <li>To process payments and manage transactions.</li>
          <li>To improve our services, website, and customer experience.</li>
          <li>
            To comply with{" "}
            <span className="highlight">legal and regulatory requirements</span>
            .
          </li>
        </ul>,
      ],
    },
    {
      title: "3. How We Share Your Information",
      content: [
        <span>
          We do not sell or rent your personal information. However, we may
          share it with:
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            <span className="highlight">Service Providers:</span> Third-party
            vendors (e.g., payment processors, cloud storage, or editing
            assistants) necessary to fulfill our services.
          </li>
          <li>
            <span className="highlight">Legal Compliance:</span> When required
            by law or to protect our rights and safety.
          </li>
        </ul>,
      ],
    },
    {
      title: "4. Data Security",
      content: [
        <span>
          We implement industry-standard security measures to protect your data,
          including encryption, secure servers, and restricted access. However,
          no method of transmission over the internet is{" "}
          <span className="highlight">100% secure</span>, and we cannot
          guarantee absolute security.
        </span>,
      ],
    },
    {
      title: "5. Your Rights & Choices",
      content: [
        <span>You have the right to:</span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            <span className="highlight">Access, update, or delete</span> your
            personal information.
          </li>
          <li>Opt out of marketing communications.</li>
          <li>Request restrictions on data processing.</li>
          <li>
            To exercise these rights, contact us at{" "}
            <a
              className="font-medium text-[#6470D8]"
              href="mailto:info@belvaphilips.com"
            >
              info@belvaphilips.com
            </a>
            .
          </li>
        </ul>,
      ],
    },
    {
      title: "6. Cookies & Tracking Technologies",
      content: [
        <span>
          Our website may use cookies to enhance user experience. You can
          disable cookies in your browser settings, but some features may not
          function properly.
        </span>,
      ],
    },
    {
      title: "7. Third-Party Links",
      content: [
        <span>
          Our website may contain links to external sites. We are not
          responsible for their privacy practices, so we encourage you to review
          their policies.
        </span>,
      ],
    },
    {
      title: "8. Changes to This Privacy Policy",
      content: [
        <span>
          We may update this Privacy Policy periodically. Any changes will be
          posted on our website with an updated revision date.
        </span>,
      ],
    },
    {
      title: "9. Contact Us",
      content: [
        <span>
          If you have questions about this Privacy Policy, please contact us at:
          <br />
          Belvaphilips Imagery
          <br />
          <a
            className="font-medium text-[#6470D8]"
            href="mailto:info@belvaphilips.com"
          >
            info@belvaphilips.com
          </a>
          <br />
          08030861847
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
            PRIVACY POLICY
          </motion.h1>

          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              {section.title !== "Introduction" && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[20px] font-semibold capitalize leading-[150%]"
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
