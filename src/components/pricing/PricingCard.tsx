// components/pricing/PricingCard.tsx
import Image from "next/image";
import { motion } from "framer-motion";

interface PricingCardProps {
  title: string;
  description: string;
  image: string;
  timeline: string;
  price: string;
  type?: "basic" | "premium" | "high" | "medium";
  format_type?: string;
  badge?: string;
  onClick?: () => void;
}

export default function PricingCard({
  title,
  description,
  image,
  timeline,
  price,
  onClick,
  badge,
  format_type,
}: PricingCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className=" overflow-hidden border-[0.5px] border-[#C9C9C9] relative cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-square">
        {format_type === "image" ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <video
            src={image}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      <div className="md:p-5 p-3 border-t-[0.5px] border-[#C9C9C9] relative">
        {(badge === "premium" || badge === "Clothing") && (
          <div
            className="absolute top-6 right-3 text-white text-xs py-[2px] px-[7px] flex items-center justify-center rounded-full capitalize"
            style={{
              background: "linear-gradient(90deg, #C49524 0%, #FFE5A7 100%)",
            }}
          >
            {badge}
          </div>
        )}

        {badge === "basic" && (
          <div className="absolute top-6 right-3 text-white text-xs py-[2px] px-[7px] flex items-center justify-center rounded-full bg-black capitalize">
            {badge}
          </div>
        )}
        <div className="max-w-[222px]">
          <h3 className="font-semibold mb-1 text-[#1D1D1B] text-sm md:text-base">
            {title}
          </h3>
          <p className="text-[#444444] md:text-sm mb-4 text-xs">
            {description}
          </p>
          <div className="flex flex-wrap items-center md:text-base text-xs text-[#1D1D1B] mb-8">
            <span className="font-medium mr-1 text-[#787878]">Timeline:</span>{" "}
            {timeline}
          </div>
        </div>

        <div className="font-bold text-[#1D1D1B] absolute bottom-3 md:text-base text-sm">
          {price}
        </div>
      </div>
    </motion.div>
  );
}
