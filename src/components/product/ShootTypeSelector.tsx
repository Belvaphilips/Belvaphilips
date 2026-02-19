import { shootTypes, isVideoAvailable } from "@/lib/mockData/portfolioData";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface ShootTypeSelectorProps {
  category: string;
  selectedType: string;
  onSelectType: (type: string) => void;
  onVideoConfigChange?: (config: {
    videoType: string;
    animationPackage: AnimationPackageKey;
    videoStyle: string;
    videoQuantity: number;
  }) => void;
}

// Define the possible animation package keys
type AnimationPackageKey =
  | "30 SECS"
  | "1 MIN"
  | "15 SECS"
  | "30 SECS (Premium)"
  | "1 MIN (Premium)";

const animationPackageLabels: Record<AnimationPackageKey, string> = {
  "30 SECS": "30 SECS ANIMATION (₦250,000)",
  "1 MIN": "1 MIN ANIMATION (₦350,000)",
  "15 SECS": "15 SECS ANIMATION (₦350,000)",
  "30 SECS (Premium)": "30 SECS ANIMATION (₦450,000)",
  "1 MIN (Premium)": "1 MIN ANIMATION (₦650,000)",
};

const ShootTypeSelector = ({
  category,
  selectedType,
  onSelectType,
  onVideoConfigChange,
}: ShootTypeSelectorProps) => {
  const availableTypes = shootTypes[category as keyof typeof shootTypes] || [];
  const [videoType, setVideoType] = useState("STANDARD");
  const [animationPackage, setAnimationPackage] =
    useState<AnimationPackageKey>("30 SECS");
  const [videoStyle, setVideoStyle] = useState("NORMAL");
  const [videoQuantity, setVideoQuantity] = useState(1);

  // Check if video is available for this category
  const videoEnabled = isVideoAvailable(category);

  const handleVideoConfigChange = () => {
    if (onVideoConfigChange && selectedType === "VIDEO") {
      onVideoConfigChange({
        videoType,
        animationPackage,
        videoStyle,
        videoQuantity,
      });
    }
  };

  useEffect(() => {
    handleVideoConfigChange();
  }, [videoType, animationPackage, videoStyle, videoQuantity]);

  return (
    <div className="flex flex-wrap gap-2 border-b pb-8 border-[#D1D1D1]">
      {availableTypes.map((type) => {
        const isSelected = selectedType === type;
        const isPopular = type === "FLATLAY" && category === "CLOTHING";
        const isVideoType = type === "VIDEO";
        const isDisabled = isVideoType && !videoEnabled;

        if (type === "VIDEO" && isSelected) {
          return (
            <div
              key={type}
              className="w-full border-t border-[#D1D1D1] pt-5 mt-5"
            >
              <div className="mb-5 border-b border-[#D1D1D1] pb-7">
                <h2 className="font-semibold mb-1 text-lg leading-[155%]">
                  VIDEO OPTIONS
                </h2>
                <p className="text-[#444444] mb-4 text-base max-w-[481px]">
                  Showcase your product with high-quality video. Choose between
                  standard footage or a dynamic 360° spin for an immersive view.
                </p>
                <div className="mt-[26px]">
                  <h2 className="text-base font-medium mb-[16px] flex items-center gap-1">
                    Video Type
                    <span>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 2.0625C9.23233 2.0625 7.50436 2.58668 6.0346 3.56874C4.56483 4.55081 3.41929 5.94665 2.74283 7.57977C2.06637 9.21288 1.88938 11.0099 2.23424 12.7436C2.57909 14.4773 3.43031 16.0698 4.68024 17.3198C5.93017 18.5697 7.52268 19.4209 9.25638 19.7658C10.9901 20.1106 12.7871 19.9336 14.4202 19.2572C16.0534 18.5807 17.4492 17.4352 18.4313 15.9654C19.4133 14.4956 19.9375 12.7677 19.9375 11C19.935 8.6304 18.9926 6.35856 17.317 4.683C15.6414 3.00743 13.3696 2.065 11 2.0625ZM11 18.5625C9.50428 18.5625 8.04215 18.119 6.7985 17.288C5.55486 16.457 4.58555 15.2759 4.01316 13.894C3.44078 12.5122 3.29101 10.9916 3.58282 9.52463C3.87462 8.05765 4.59487 6.71014 5.65251 5.65251C6.71014 4.59487 8.05765 3.87461 9.52463 3.58281C10.9916 3.29101 12.5122 3.44077 13.894 4.01316C15.2759 4.58555 16.457 5.55485 17.288 6.7985C18.119 8.04215 18.5625 9.50428 18.5625 11C18.5602 13.005 17.7627 14.9272 16.345 16.345C14.9272 17.7627 13.005 18.5602 11 18.5625ZM12.375 15.125C12.375 15.3073 12.3026 15.4822 12.1736 15.6111C12.0447 15.7401 11.8698 15.8125 11.6875 15.8125C11.3228 15.8125 10.9731 15.6676 10.7152 15.4098C10.4574 15.1519 10.3125 14.8022 10.3125 14.4375V11C10.1302 11 9.9553 10.9276 9.82637 10.7986C9.69744 10.6697 9.625 10.4948 9.625 10.3125C9.625 10.1302 9.69744 9.9553 9.82637 9.82636C9.9553 9.69743 10.1302 9.625 10.3125 9.625C10.6772 9.625 11.0269 9.76987 11.2848 10.0277C11.5426 10.2856 11.6875 10.6353 11.6875 11V14.4375C11.8698 14.4375 12.0447 14.5099 12.1736 14.6389C12.3026 14.7678 12.375 14.9427 12.375 15.125ZM9.625 7.21875C9.625 7.01479 9.68549 6.81541 9.7988 6.64582C9.91212 6.47623 10.0732 6.34405 10.2616 6.266C10.45 6.18795 10.6574 6.16752 10.8574 6.20731C11.0575 6.24711 11.2412 6.34532 11.3855 6.48955C11.5297 6.63377 11.6279 6.81752 11.6677 7.01756C11.7075 7.21761 11.6871 7.42496 11.609 7.61339C11.531 7.80183 11.3988 7.96289 11.2292 8.0762C11.0596 8.18952 10.8602 8.25 10.6563 8.25C10.3827 8.25 10.1204 8.14135 9.92705 7.94795C9.73365 7.75456 9.625 7.49225 9.625 7.21875Z"
                          fill="#787878"
                        />
                      </svg>
                    </span>
                  </h2>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => setVideoType("STANDARD")}
                      className={`px-[10px] py-1 border rounded-full text-sm font-medium cursor-pointer ${
                        videoType === "STANDARD"
                          ? "bg-[#D3D3D3] border-[#1D1D1B]"
                          : "border-[#C9C9C9] border-[0.5px]"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      STANDARD
                    </motion.button>
                    <motion.button
                      onClick={() => setVideoType("STOP MOTION")}
                      className={`px-[10px] py-1 border rounded-full text-sm font-medium cursor-pointer ${
                        videoType === "STOP MOTION"
                          ? "bg-[#D3D3D3] border-[#1D1D1B]"
                          : "border-[#C9C9C9] border-[0.5px]"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      STOP MOTION
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-semibold mb-1 text-lg leading-[155%]">
                  ANIMATION PACKAGES
                </h2>
                <p className="text-[#444444] mb-4 text-base">
                  Select an animation package that fits your needs
                </p>
                <div className="space-y-4">
                  <div>
                    <h1 className="font-medium text-base flex items-center gap-1">
                      Animations (Basic Rate)
                      <span>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 2.0625C9.23233 2.0625 7.50436 2.58668 6.0346 3.56874C4.56483 4.55081 3.41929 5.94665 2.74283 7.57977C2.06637 9.21288 1.88938 11.0099 2.23424 12.7436C2.57909 14.4773 3.43031 16.0698 4.68024 17.3198C5.93017 18.5697 7.52268 19.4209 9.25638 19.7658C10.9901 20.1106 12.7871 19.9336 14.4202 19.2572C16.0534 18.5807 17.4492 17.4352 18.4313 15.9654C19.4133 14.4956 19.9375 12.7677 19.9375 11C19.935 8.6304 18.9926 6.35856 17.317 4.683C15.6414 3.00743 13.3696 2.065 11 2.0625ZM11 18.5625C9.50428 18.5625 8.04215 18.119 6.7985 17.288C5.55486 16.457 4.58555 15.2759 4.01316 13.894C3.44078 12.5122 3.29101 10.9916 3.58282 9.52463C3.87462 8.05765 4.59487 6.71014 5.65251 5.65251C6.71014 4.59487 8.05765 3.87461 9.52463 3.58281C10.9916 3.29101 12.5122 3.44077 13.894 4.01316C15.2759 4.58555 16.457 5.55485 17.288 6.7985C18.119 8.04215 18.5625 9.50428 18.5625 11C18.5602 13.005 17.7627 14.9272 16.345 16.345C14.9272 17.7627 13.005 18.5602 11 18.5625ZM12.375 15.125C12.375 15.3073 12.3026 15.4822 12.1736 15.6111C12.0447 15.7401 11.8698 15.8125 11.6875 15.8125C11.3228 15.8125 10.9731 15.6676 10.7152 15.4098C10.4574 15.1519 10.3125 14.8022 10.3125 14.4375V11C10.1302 11 9.9553 10.9276 9.82637 10.7986C9.69744 10.6697 9.625 10.4948 9.625 10.3125C9.625 10.1302 9.69744 9.9553 9.82637 9.82636C9.9553 9.69743 10.1302 9.625 10.3125 9.625C10.6772 9.625 11.0269 9.76987 11.2848 10.0277C11.5426 10.2856 11.6875 10.6353 11.6875 11V14.4375C11.8698 14.4375 12.0447 14.5099 12.1736 14.6389C12.3026 14.7678 12.375 14.9427 12.375 15.125ZM9.625 7.21875C9.625 7.01479 9.68549 6.81541 9.7988 6.64582C9.91212 6.47623 10.0732 6.34405 10.2616 6.266C10.45 6.18795 10.6574 6.16752 10.8574 6.20731C11.0575 6.24711 11.2412 6.34532 11.3855 6.48955C11.5297 6.63377 11.6279 6.81752 11.6677 7.01756C11.7075 7.21761 11.6871 7.42496 11.609 7.61339C11.531 7.80183 11.3988 7.96289 11.2292 8.0762C11.0596 8.18952 10.8602 8.25 10.6563 8.25C10.3827 8.25 10.1204 8.14135 9.92705 7.94795C9.73365 7.75456 9.625 7.49225 9.625 7.21875Z"
                            fill="#787878"
                          />
                        </svg>
                      </span>
                    </h1>
                    <div className="flex gap-2 mt-2">
                      <motion.button
                        onClick={() => setAnimationPackage("30 SECS")}
                        className={`px-[10px] py-1 border rounded-full text-sm font-medium cursor-pointer ${
                          animationPackage === "30 SECS"
                            ? "bg-[#D3D3D3] border-[#1D1D1B]"
                            : "border-[#C9C9C9] border-[0.5px]"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {animationPackageLabels["30 SECS"]}
                      </motion.button>
                      <motion.button
                        onClick={() => setAnimationPackage("1 MIN")}
                        className={`px-[10px] py-1 border rounded-full text-sm font-medium cursor-pointer ${
                          animationPackage === "1 MIN"
                            ? "bg-[#D3D3D3] border-[#1D1D1B]"
                            : "border-[#C9C9C9] border-[0.5px]"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {animationPackageLabels["1 MIN"]}
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-5">
                    <span className="font-medium text-base">
                      Animations (Premium Rate)
                    </span>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <motion.button
                        onClick={() => setAnimationPackage("15 SECS")}
                        className={`px-[10px] py-1 border rounded-full text-sm font-medium cursor-pointer ${
                          animationPackage === "15 SECS"
                            ? "bg-[#D3D3D3] border-[#1D1D1B]"
                            : "border-[#C9C9C9] border-[0.5px]"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {animationPackageLabels["15 SECS"]}
                      </motion.button>
                      <motion.button
                        onClick={() => setAnimationPackage("30 SECS (Premium)")}
                        className={`px-[10px] py-1 border rounded-full text-sm font-medium cursor-pointer ${
                          animationPackage === "30 SECS (Premium)"
                            ? "bg-[#D3D3D3] border-[#1D1D1B]"
                            : "border-[#C9C9C9] border-[0.5px]"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {animationPackageLabels["30 SECS (Premium)"]}
                      </motion.button>
                      <motion.button
                        onClick={() => setAnimationPackage("1 MIN (Premium)")}
                        className={`px-[10px] py-1 border rounded-full text-sm font-medium cursor-pointer ${
                          animationPackage === "1 MIN (Premium)"
                            ? "bg-[#D3D3D3] border-[#1D1D1B]"
                            : "border-[#C9C9C9] border-[0.5px]"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {animationPackageLabels["1 MIN (Premium)"]}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5 border-b border-[#D1D1D1] pb-7">
                <h2 className="font-semibold mb-2 text-lg leading-[155%]">
                  Video Style
                </h2>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setVideoStyle("NORMAL")}
                    className={`px-[10px] py-1 border rounded-full text-sm font-medium cursor-pointer ${
                      videoStyle === "NORMAL"
                        ? "bg-[#D3D3D3] border-[#1D1D1B]"
                        : "border-[#C9C9C9] border-[0.5px]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    NORMAL
                  </motion.button>
                  <motion.button
                    onClick={() => setVideoStyle("360 SPIN (ADDITIONAL FEES)")}
                    className={`px-[10px] py-1 border rounded-full text-sm font-medium cursor-pointer ${
                      videoStyle === "360 SPIN (ADDITIONAL FEES)"
                        ? "bg-[#D3D3D3] border-[#1D1D1B]"
                        : "border-[#C9C9C9] border-[0.5px]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    360 SPIN (ADDITIONAL FEES)
                  </motion.button>
                </div>
              </div>

              <div className="mb-0">
                <h2 className="font-semibold mb-1 text-lg leading-[155%]">
                  VIDEO QUANTITY
                </h2>
                <p className="text-[#444444] mb-4 text-base">
                  Input the number of shots you would like
                </p>
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={() =>
                      setVideoQuantity(Math.max(1, videoQuantity - 1))
                    }
                    className="w-[69.41px] h-[69.41px] rounded-full border-[0.5px] border-[#1D1D1B] flex items-center justify-center cursor-pointer text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    whileHover={videoQuantity > 1 ? { scale: 1.05 } : {}}
                    whileTap={videoQuantity > 1 ? { scale: 0.95 } : {}}
                    disabled={videoQuantity <= 1}
                  >
                    <Minus size={18} />
                  </motion.button>
                  <span className="text-xl">{videoQuantity}</span>
                  <motion.button
                    onClick={() => setVideoQuantity(videoQuantity + 1)}
                    className="w-[69.41px] h-[69.41px] rounded-full border-[0.5px] border-[#1D1D1B] flex items-center justify-center cursor-pointer text-gray-700 hover:bg-gray-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <motion.div
            key={type}
            onClick={() => {
              if (!isDisabled) {
                onSelectType(type);
              }
            }}
            className={`
              ${
                !isDisabled ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              } 
              rounded-full px-[10px] py-1 text-sm flex items-center gap-1 font-medium
              ${
                isSelected
                  ? "bg-[#D3D3D3] border border-[#1D1D1B]"
                  : "border-[0.5px] border-[#C9C9C9] hover:border-gray-400"
              }
              ${isPopular ? "relative" : ""}
             
            `}
            whileHover={!isDisabled ? { scale: 1.05 } : {}}
            whileTap={!isDisabled ? { scale: 0.95 } : {}}
          >
            <div className="flex items-center space-x-1">
              <span>{type}</span>

              {isPopular && (
                <span className="ml-0 font-medium text-sm text-[#D63131] px-2 py-0.5 rounded-full">
                  POPULAR!
                </span>
              )}
            </div>
            {/* {isSelected && type === "MODEL" && (
              <span className="block text-xs text-[#787878]">
                (MEDIUM END FINISH)
              </span>
            )} */}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ShootTypeSelector;
