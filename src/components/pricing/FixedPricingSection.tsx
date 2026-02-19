"use client";
import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
import Image from "next/image";
import { useState } from "react";
import GetStartedModal from "../getStartedModal";
import { useRouter } from "next/navigation";

interface PricingOption {
  title: string;
  description: string;
  image: string;
  timeline: string;
  price: string;
  type: "basic" | "medium" | "high" | "premium";
  format_type: string;
  badge?: string;
}

const pricingOptions: PricingOption[] = [
  {
    title: "BASIC END FINISH",
    description:
      "Clean, white-background images perfect for eCommerce and social media.",
    image: "/assets/pricing/basic-end.jpg",
    timeline: "7 business days",
    price: "₦25,000/image",
    type: "basic" as const,
    format_type: "image",
  },
  // {
  //   title: "MEDIUM END FINISH",
  //   description:
  //     "Styled product shots with colorful backdrops for a polished look.",
  //   image: "/assets/pricing/medium-end.jpg",
  //   timeline: "7-9 business days",
  //   price: "₦44,000/image",
  //   type: "medium" as const,
  //   format_type: "image",
  // },
  // {
  //   title: "MEDIUM END FINISH",
  //   description:
  //     "Styled product shots with colorful backdrops for a polished look.",
  //   image: "/assets/pricing/medium-end2.jpg",
  //   timeline: "7-9 business days",
  //   price: "₦45,000/image",
  //   type: "medium" as const,
  //   badge: "Clothing",
  //   format_type: "image",
  // },
  {
    title: "HIGH END FINISH",
    description:
      "High-quality visuals ideal for campaigns, branding, and product launches.",
    image: "/assets/pricing/high-2.jpg",
    timeline: "7-9 business days",
    price: "₦65,000/image",
    type: "high" as const,
    format_type: "image",
  },
];

const premiumOption = {
  title: "PREMIUM END FINISH",
  description:
    "A fusion of photography and CGI for limitless creative possibilities.",
  image: "/assets/pricing/premium-end.jpg",
  timeline: "8-10 business days",
  price: "₦150,000/image",
  type: "premium" as const,
  format_type: "image",
};

export default function FixedPricingSection() {
  const router = useRouter();
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (option: any) => {
    const config = {
      finish: option.title,
      shootType: "",
      quantity: 0,
      basePrice: "",
      category: "",
      total: "",
      price: "",
      membershipPlan: "",
    };
    localStorage.setItem("productConfig", JSON.stringify(config));
    router.push("/finalize");
  };

  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <div className="max-w-[630px] md:block hidden">
        <h2 className="text-[28px] leading-[145%] font-medium mb-2 text-[#1D1D1B]">
          PER-IMAGE FIXED PRICING
        </h2>
        <p className="text-[#444444]">
          We offer fixed per-image pricing based on your selected service tier,
          while also allowing for remote coordination.
        </p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-[6px]">
          {pricingOptions.map((option, index) => (
            <PricingCard
              key={index}
              title={option.title}
              description={option.description}
              image={option.image}
              timeline={option.timeline}
              price={option.price}
              type={option.type}
              badge={option.badge}
              format_type={option.format_type}
              onClick={() => handleClick(option)}
            />
          ))}
          <PricingCard
            title={premiumOption.title}
            description={premiumOption.description}
            image={premiumOption.image}
            timeline={premiumOption.timeline}
            price={premiumOption.price}
            type={premiumOption.type}
            format_type={premiumOption.format_type}
            onClick={() => handleClick(premiumOption)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <div className="col-span-3 md:flex items-center justify-center hidden">
          <div className="relative w-full h-70">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full text-center">
                <motion.div
                  className="inline-flex items-center flex-col cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="text-[#ACACAC] text-[126.44px] text-left w-full font-semibold leading-[115%] tracking-[-4.58px]">
                    GET STARTED
                  </span>
                  <div className="-mt-5">
                    <Image
                      src="/assets/images/get-started-arrow.svg"
                      width={903}
                      height={0}
                      alt="w-[903px] h-auto"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GetStartedModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </motion.div>
  );
}
