import { motion } from "framer-motion";
import { getAvailableFinishes } from "@/lib/mockData/portfolioData";

interface FinishSelectorProps {
  selectedFinish: string;
  onSelectFinish: (finish: string) => void;
  category: string;
  shootType: string;
}

const finishes = [
  {
    id: "basic",
    title: "BASIC END FINISH",
    description:
      "Clean, white-background images perfect for eCommerce and social media.",
    price: "₦25,000/image",
  },
  // {
  //   id: "medium",
  //   title: "MEDIUM END FINISH",
  //   description:
  //     "Styled product shots with colorful backdrops for a polished look.",
  //   price: "₦45,000/image",
  // },
  {
    id: "high",
    title: "HIGH END FINISH",
    description:
      "High-quality visuals ideal for campaigns, branding, and product launches.",
    price: "₦65,000/image",
  },
  {
    id: "premium",
    title: "PREMIUM END FINISH",
    description:
      "A fusion of photography and CGI for limitless creative possibilities.",
    price: "₦150,000/image",
  },
];

const FinishSelector = ({
  selectedFinish,
  onSelectFinish,
  category,
  shootType,
}: FinishSelectorProps) => {
  // Get available finishes based on category and shoot type
  const availableFinishTitles = getAvailableFinishes(category, shootType);

  // Filter finishes based on available options
  const availableFinishes = finishes.filter((finish) =>
    availableFinishTitles.includes(finish.title)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {availableFinishes.map((finish) => (
        <motion.div
          key={finish.id}
          className={`border-[0.5px] border-[#1D1D1B] p-4 cursor-pointer transition-colors ${
            selectedFinish === finish.title
              ? "border-gray-800 bg-[#E3E3E3]"
              : "border-[#C9C9C9] hover:border-gray-400"
          }`}
          onClick={() => onSelectFinish(finish.title)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold md:text-base text-lg">
                  {finish.title}
                </h3>
                {selectedFinish === finish.title && (
                  <span className="text-sm text-[#1D1D1B]">SELECTED</span>
                )}
              </div>
              <p className="text-[#444444] text-sm mb-4 max-w-[208px]">
                {finish.description}
              </p>
            </div>
            <div className="font-semibold md:text-base text-lg">
              {finish.price}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FinishSelector;
