"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const plans = [
  {
    id: "pay-as-you-go",
    title: "PAY AS YOU GO",
    description: "No commitment. Best suited for small or one-time orders.",
    price: "₦75,000/image",
    savings: "",
  },
  {
    id: "starter",
    title: "STARTER",
    description: "For developing brands with over 100 images a year.",
    price: "₦5.2million/year",
    savings: "10% per image savings",
  },
  {
    id: "growth",
    title: "GROWTH",
    description: "For emerging brands with over 250 images a year.",
    price: "₦12.6million/year",
    savings: "15% per image savings",
  },
  {
    id: "enterprise",
    title: "ENTERPRISE",
    description: "For established brands with over 500 images a year.",
    price: "₦25million/year",
    savings: "25% per image savings",
  },
];

const MembershipPlans = ({
  selectedMembershipPlan,
  setSelectedMembershipPlan,
}: {
  selectedMembershipPlan: string | null;
  setSelectedMembershipPlan: Dispatch<SetStateAction<string | null>>;
}) => {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const toggleExpand = (planId: string) => {
    if (expandedPlan === planId) {
      setExpandedPlan(null);
    } else {
      setExpandedPlan(planId);
    }
  };

  const handleMembershipPlanToggleSelect = (planId: string) => {
    setSelectedMembershipPlan((prevSelectedPlanId) =>
      prevSelectedPlanId === planId ? null : planId
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          className={`border border-gray-200 overflow-hidden  cursor-pointer ${
            selectedMembershipPlan === plan.title ? "border-gray-800" : ""
          } `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            toggleExpand(plan.id);
            handleMembershipPlanToggleSelect(plan.title);
          }}
        >
          <div className="p-5">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold md:text-base text-lg">
                {plan.title}
              </h3>
              {plan.savings && (
                <span
                  className="text-white text-xs px-2 py-[2px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #C49524 0%, #FFE5A7 100%)",
                  }}
                >
                  {plan.savings}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mt-2 max-w-[227px] mb-9">
              {plan.description}
            </p>

            <div className="flex flex-col flex-col-reverse">
              <span className="font-semibold md:text-base text-lg">
                {plan.price}
              </span>
              <button
                onClick={() => toggleExpand(plan.id)}
                className="text-[#C49524] flex items-center text-sm mb-[10px] font-semibold cursor-pointer"
              >
                Show details
                <motion.div
                  animate={{ rotate: expandedPlan === plan.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={16} className="ml-1" />
                </motion.div>
              </button>
            </div>
          </div>

          {expandedPlan === plan.id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4 text-sm text-gray-600"
            >
              <ul className="list-disc pl-5 space-y-1">
                <li>Professional photography sessions</li>
                <li>High-quality image editing</li>
                <li>Fast turnaround times</li>
                <li>Dedicated account manager</li>
                {plan.id !== "pay-as-you-go" && (
                  <>
                    <li>Priority scheduling</li>
                    <li>Volume discounts</li>
                  </>
                )}
                {(plan.id === "growth" || plan.id === "enterprise") && (
                  <li>Expedited delivery options</li>
                )}
                {plan.id === "enterprise" && (
                  <>
                    <li>Custom shot lists</li>
                    <li>Unlimited revisions</li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default MembershipPlans;
