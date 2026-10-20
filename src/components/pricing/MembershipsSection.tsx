"use client";
import { motion } from "framer-motion";
import MembershipCard from "./MembershipCard";
import { useRouter } from "next/navigation";

export default function MembershipsSection() {
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

  const handleGetStarted = (selectedMembershipPlan: string, price: string) => {
    console.log("Get started clicked");
    const config = {
      finish: "",
      shootType: "",
      quantity: 0,
      basePrice: "",
      category: "",
      total: "",
      price,
      membershipPlan: selectedMembershipPlan,
    };

    localStorage.setItem("productConfig", JSON.stringify(config));
    router.push("/finalize");
    console.log(selectedMembershipPlan, price);
  };

  return (
    <motion.div
      variants={itemVariants}
      className="md:space-y-6 space-y-5 pb-10"
    >
      <div className="max-w-[575px]">
        <h2 className="md:text-[82.83px] text-[38px] md:font-semibold font-bold leading-[115%] md:tracking-[-3px] tracking-[-0.5px] mb-2 text-[#1D1D1B]">
          MEMBERSHIPS
        </h2>
        <p className="text-[#444444] md:text-lg texr-sm">
          Enjoy flexible options tailored to your needs. Save more with higher
          volume and get exclusive perks with our membership plans.
        </p>
      </div>

      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-5 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory">
        <div className="flex-shrink-0 w-[280px] md:w-auto snap-center">
          <MembershipCard
            title="PAY AS YOU GO"
            description="No commitment. Best suited for small or one-time orders."
            price="Per Image"
            savingsPercentage="No image savings "
            minimumOrder="5 minimum order"
            turnaround="7 business days"
            onGetStarted={() => handleGetStarted("PAY AS YOU GO", "")}
            startingPrice="₦75,000/image"
            noHeader={true}
          />
        </div>

        <div className="flex-shrink-0 w-[280px] md:w-auto snap-center">
          <MembershipCard
            title="STARTER"
            description="For developing brands with over 100 images a year."
            price="₦5.2million/year"
            savingsPercentage="10% per image savings"
            imagesPerMonth="8 Images per month"
            turnaround="7 business days"
            minimumOrder="No minimum order"
            onGetStarted={() => handleGetStarted("STARTER", "₦5.2million/year")}
            startingPrice="₦55,000/image"
          />
        </div>

        <div className="flex-shrink-0 w-[280px] md:w-auto snap-center">
          <MembershipCard
            title="GROWTH"
            description="For emerging brands with over 250 images a year."
            price="₦12.6million/year"
            savingsPercentage="15% per image savings"
            imagesPerMonth="20 Images per month"
            turnaround="7 business days"
            minimumOrder="No minimum order"
            onGetStarted={() => handleGetStarted("GROWTH", "₦12.6million/year")}
            startingPrice="₦45,000/image"
          />
        </div>

        <div className="flex-shrink-0 w-[280px] md:w-auto snap-center">
          <MembershipCard
            title="ENTERPRISE"
            description="For established brands with over 500 images a year."
            price="₦25million/year"
            savingsPercentage="25% per image savings"
            imagesPerMonth="41 Images per month"
            turnaround="7 business days"
            minimumOrder="No minimum order"
            onGetStarted={() =>
              handleGetStarted("ENTERPRISE", "₦25million/year")
            }
            startingPrice="Varies/image"
          />
        </div>
      </div>
    </motion.div>
  );
}
