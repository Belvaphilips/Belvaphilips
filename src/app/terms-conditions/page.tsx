"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TermsAndConditions() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    {
      title: "Communications",
      content: [
        <span>
          By creating an Account on our service, you agree to subscribe to
          newsletters, marketing or promotional materials and other information
          we may send. However, you may opt out of receiving any, or all, of
          these communications from us by following the unsubscribe link or
          instructions provided in any email we send.
        </span>,
      ],
    },
    {
      title: "Purchases",
      content: [
        <span>
          If you wish to purchase any product or service made available through
          the Service ("Purchase"), you may be asked to supply certain
          information relevant to your Purchase including, without limitation,
          your debit card number, the expiration date of your debit card, your
          billing address, and your shipping information.
        </span>,
        <span>
          You represent and warrant that: (i) you have the legal right to use
          any debit card(s) or other payment method(s) in connection with any
          Purchase; and that (ii) the information you supply to us is true,
          correct and complete.
        </span>,
        <span>
          The service may employ the use of third party services for the purpose
          of facilitating payment and the completion of Purchases. By submitting
          your information, you grant us the right to provide the information to
          these third parties subject to our Privacy Policy.
        </span>,
        <span>
          We reserve the right to refuse or cancel your order at any time for
          reasons including but not limited to: product or service availability,
          errors in the description or price of the product or service, error in
          your order or other reasons.
        </span>,
        <span>
          We reserve the right to refuse or cancel your order if fraud or an
          unauthorized or illegal transaction is suspected.
        </span>,
      ],
    },
    {
      title: "Availability, Errors and Inaccuracies",
      content: [
        <span>
          We are constantly updating product and service offerings on the
          Service. We may experience delays in updating information on the
          Service and in our advertising on other web sites. The information
          found on the Service may contain errors or inaccuracies and may not be
          complete or current. Products or services may be mispriced, described
          inaccurately, or unavailable on the Service and we cannot guarantee
          the accuracy or completeness of any information found on the Service.
        </span>,

        <span>
          We therefore reserve the right to change or update information and to
          correct errors, inaccuracies, or omissions at any time without prior
          notice.
        </span>,
      ],
    },
    {
      title: "Contests, Sweepstakes and Promotions",
      content: [
        <span>
          Any contests or other promotions (collectively, "Promotions") made
          available through the Service may be governed by rules that are
          separate from these Terms & Conditions. If you participate in any
          Promotions, please review the applicable rules as well as our Privacy
          Policy. If the rules for a Promotion conflict with these Terms and
          Conditions, the Promotion rules will apply.
        </span>,
      ],
    },
    {
      title: "Content",
      content: [
        <span>
          Our Service allows you to post, link, store, share and otherwise make
          available certain information, text, graphics, videos, or other
          material ("Content"). You are responsible for the Content that you
          post on or through the Service, including its legality, reliability,
          and appropriateness.
        </span>,
        <span>
          By posting Content on or through the Service, You represent and
          warrant that: (i) the Content is yours (you own it) and/or you have
          the right to use it and the right to grant us the rights and license
          as provided in these Terms, and (ii) that the posting of your Content
          on or through the Service does not violate the privacy rights,
          publicity rights, copyrights, contract rights or any other rights of
          any person or entity. We reserve the right to terminate the account of
          anyone found to be infringing on a copyright.
        </span>,
        <span>
          You retain any and all of your rights to any Content you submit, post
          or display on or through the Service and you are responsible for
          protecting those rights. We take no responsibility and assume no
          liability for Content you or any third party posts on or through the
          Service. However, by posting Content using the Service you grant us
          the right and license to use, modify, perform, display, reproduce, and
          distribute such Content on and through the Service.
        </span>,
        <span>
          Belvaphilips has the right but not the obligation to monitor and edit
          all Content provided by users.
        </span>,
        <span>
          In addition, Content found on or through this Service are the property
          of belvaphilips. or used with permission. You may not distribute,
          modify, transmit, reuse, download, repost, copy, or use said Content,
          whether in whole or in part, for commercial purposes or for personal
          gain, without express advance written permission from us.
        </span>,
      ],
    },
    {
      title: "Accounts",
      content: [
        <span>
          When you create an account with us, you guarantee that you are above
          the age of 18, and that the information you provide us is accurate,
          complete, and current at all times. Inaccurate, incomplete, or
          obsolete information may result in the immediate termination of your
          account on the Service.
        </span>,
        <span>
          You are responsible for maintaining the confidentiality of your
          account and password, including but not limited to the restriction of
          access to your computer and/or account. You agree to accept
          responsibility for any and all activities or actions that occur under
          your account and/or password, whether your password is with our
          Service or a third-party service. You must notify us immediately upon
          becoming aware of any breach of security or unauthorized use of your
          account.
        </span>,
        <span>
          You may not use as a username the name of another person or entity or
          that is not lawfully available for use, a name or trademark that is
          subject to any rights of another person or entity other than you,
          without appropriate authorization. You may not use as a username any
          name that is offensive, vulgar or obscene.
        </span>,
        <span>
          We reserve the right to refuse service, terminate accounts, remove or
          edit content, or cancel orders in our sole discretion.
        </span>,
        <span>prior notice.</span>,
      ],
    },
    {
      title: "Membership Plans and Billing",
      content: [
        <span className="text-[22px] font-medium text-[#1D1D1B] uppercase">
          Overview
        </span>,
        <ol className="list-decimal space-y-6 pl-5">
          <li>
            <span className="text-[#1D1D1B] font-semibold">Applicability:</span>
            The following terms{" "}
            <span className="text-[#1D1D1B] font-semibold">
              (“Membership Terms”)
            </span>
            apply to the membership plans offered by Belvaphilips, including the
            <span className="text-[#1D1D1B] font-semibold">
              Annual Prepaid Plan
            </span>
            . These Membership Terms supplement and form part of our term of use
          </li>
          <li>
            <span className="text-[#1D1D1B] font-semibold">B2B Service:</span>{" "}
            Our membership plans are designed for business-to-business{" "}
            <span className="text-[#1D1D1B] font-semibold">(“B2B”)</span>{" "}
            transactions. While we strive to comply with all applicable legal
            obligations, certain consumer protection statutes may not apply to
            business transactions.
          </li>
        </ol>,
        <span className="text-[22px] font-medium text-[#1D1D1B] uppercase">
          Billing Terms
        </span>,
        <span className="text-[#1D1D1B] font-semibold">Payment Methods</span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            You must provide a valid payment method (e.g., Debit card) at the
            time of purchase.
          </li>
          <li>
            All payments are due in Nigeria Naira (NGN), unless otherwise
            specified.
          </li>
        </ul>,
        <span className="text-[#1D1D1B] font-semibold">
          Late or Failed Payments.
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            If your payment is late or fails (e.g., declined debit card), we may
            immediately suspend or terminate access to your services until the
            issue is resolved.
          </li>
          <li>
            You are responsible for keeping your payment information current and
            valid.
          </li>
        </ul>,
        <span className="text-[22px] font-medium text-[#1D1D1B] uppercase">
          Cancellation and Early Termination
        </span>,
        <span className="text-[#1D1D1B] font-semibold">
          Annual Plan (Paid Monthly)
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            <span className="text-[#1D1D1B] font-semibold">
              Early Cancellation:
            </span>{" "}
            If you cancel before the 12-month term is complete, you will be
            charged a cancellation fee equal to{" "}
            <span className="text-[#1D1D1B] font-semibold">
              50% of the remaining contract value.
            </span>{" "}
            For example, if you cancel after 6 months, you owe 50% of the
            monthly fees for the remaining 6 months.
          </li>
          <li>
            <span className="text-[#1D1D1B] font-semibold">
              Notice of Cancellation:
            </span>{" "}
            To cancel your Annual Plan (Paid Monthly), you must do so through
            the{" "}
            <span className="text-[#1D1D1B] font-semibold">Client Portal</span>{" "}
            in your Belvaphilips Imagery account. Once you submit your
            cancellation request, your membership will end at the conclusion of
            the current billing period. We will then{" "}
            <span className="text-[#1D1D1B] font-semibold">
              promptly issue an invoice
            </span>{" "}
            with a{" "}
            <span className="text-[#1D1D1B] font-semibold">
              cancellation fee
            </span>{" "}
            under the Early Termination terms. No additional refunds apply to
            the monthly fees already paid unless otherwise required by law or
            specified in our Refund Policy.
          </li>
          <li>
            <span className="text-[#1D1D1B] font-semibold">
              Unpaid Cancellation Fee:
            </span>{" "}
            If the cancellation fee remains unpaid after its due date, the
            outstanding amount will be added to your account balance, which will
            be visible in your{" "}
            <span className="text-[#1D1D1B] font-semibold">Client Portal.</span>{" "}
            This balance must be paid in full before purchasing or utilizing any
            additional services.
          </li>
        </ul>,
        <span className="text-[22px] font-semibold text-[#1D1D1B] uppercase">
          Refund and Proration Policies
        </span>,
        <span>
          We provide refunds for Membership plans, excluding the amount that
          Belvaphilips provided as a discount for all services utilized by the
          client within the Membership plan.
        </span>,
        <span>
          We recommend purchasing a Membership Plan after you have tested our
          services. This way, you can ensure that you like the service and it
          meets your expectations.
        </span>,
        <span className="text-[22px] font-medium text-[#1D1D1B] uppercase">
          Disclaimer of Liability
        </span>,
        <span className="text-[#1D1D1B] font-semibold">
          Limitation on Liability
        </span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            Except as otherwise provided in our Terms of Use or required by law,
            Belvaphilips Imagery shall not be liable for any indirect,
            incidental, special, or consequential damages arising from or
            related to your membership plan, cancellation, or early termination
            fees.
          </li>
          <li>
            Our total liability for direct damages is limited to the fees you
            have paid us in the 3-month period preceding the event giving rise
            to the claim.
          </li>
        </ul>,
        <span className="text-[#1D1D1B] font-semibold">Force Majeure.</span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            We are not responsible for performance delays or failures resulting
            from acts beyond our reasonable control, such as natural disasters,
            power outages, or internet disturbances.
          </li>
        </ul>,
        <span className="text-[#1D1D1B] font-semibold">Entire Agreement.</span>,
        <ul className="list-disc pl-5 -mt-3">
          <li>
            These Membership Terms and our overall Terms of Use constitute the
            entire agreement between you and Belvaphilips regarding membership
            plans, superseding any prior or contemporaneous agreements,
            communications, or proposals
          </li>
        </ul>,
      ],
    },

    {
      title: "Termination",
      content: [
        <span>
          We may terminate or suspend your account and bar access to the Service
          immediately, without prior notice or liability, under our sole
          discretion, for any reason whatsoever and without limitation,
          including but not limited to a breach of the Terms.
          <br /> If you wish to terminate your account, you may simply
          discontinue using the Service. All provisions of the Terms which by
          their nature should survive termination shall survive termination,
          including, without limitation, ownership provisions, warranty
          disclaimers, indemnity and limitations of liability.
        </span>,
      ],
    },
    {
      title: "Indemnification",
      content: [
        <span>
          You agree to defend, indemnify and hold harmless Belvaphilips Imagery.
          and its licensee and licensors, and their employees, contractors,
          agents, officers and directors, from and against any and all claims,
          damages, obligations, losses, liabilities, costs or debt, and expenses
          (including but not limited to attorney's fees), resulting from or
          arising out of a) your use and access of the Service, by you or any
          person using your account and password; b) a breach of these Terms, or
          c) Content posted on the Service.
        </span>,
      ],
    },
    {
      title: "Limitation Of Liability",
      content: [
        <span>
          In no event shall Belvaphilips Imagery, nor its directors, employees,
          partners, agents, suppliers, or affiliates, be liable for any
          indirect, incidental, special, consequential or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or
          other intangible losses, resulting from (i) your access to or use of
          or inability to access or use the Service; (ii) any conduct or content
          of any third party on the Service; (iii) any content obtained from the
          Service; and (iv) unauthorized access, use or alteration of your
          transmissions or content, whether based on warranty, contract, tort
          (including negligence) or any other legal theory, whether or not we
          have been informed of the possibility of such damage, and even if a
          remedy set forth herein is found to have failed of its essential
          purpose.
        </span>,
      ],
    },
    {
      title: "Disclaimer",
      content: [
        <span>
          Your use of the Service is at your sole risk. The Service is provided
          on an "AS IS" and "AS AVAILABLE" basis. The Service is provided
          without warranties of any kind, whether express or implied, including,
          but not limited to, implied warranties of merchantability, fitness for
          a particular purpose, non-infringement or course of performance.
          <br />
          Belvaphilips Imagery. its subsidiaries, affiliates, and its licensors
          do not warrant that a) the Service will function uninterrupted, secure
          or available at any particular time or location; b) any errors or
          defects will be corrected; c) the Service is free of viruses or other
          harmful components; or d) the results of using the Service will meet
          your requirements.
        </span>,
      ],
    },
    {
      title: "Exclusions",
      content: [
        <span>
          Some jurisdictions do not allow the exclusion of certain warranties or
          the exclusion or limitation of liability for consequential or
          incidental damages, so the limitations above may not apply to you.
        </span>,
      ],
    },
    {
      title: "Changes",
      content: [
        <span>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material we will provide at
          least 15 days notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole
          discretion.
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
            className="md:text-[82.83px] text-[38px] md:font-semibold font-bold mb-[20px] leading-[115%] tracking-[-3px] uppercase"
          >
            Terms and Conditions
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=" flex flex-col gap-5 mb-8 max-w-[908px]"
          >
            <p className="text-[#787878] text-base md:text-sm">
              Last updated: March 29, 2025
            </p>
            <p className="md:text-lg text-sm text-[#444444] leading-relaxed">
              Please read these{" "}
              <span className="text-[#1D1D1B] font-semibold">
                Terms and Conditions ("Terms", "Terms and Conditions")
              </span>{" "}
              carefully.
              <br /> Your access to and use of the Service is conditioned upon
              your acceptance of and compliance with these Terms. These Terms
              apply to all visitors, users and others who wish to access or use
              the Service. By accessing or using the Service you agree to be
              bound by these Terms. If you disagree with any part of the terms
              then you do not have permission to access the Service.
            </p>
          </motion.div>

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
