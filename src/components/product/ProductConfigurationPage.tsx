"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FinishSelector from "./FinishSelector";
import ShootTypeSelector from "./ShootTypeSelector";
import ImageQuantitySelector from "./ImageQuantitySelector";
import MembershipPlans from "./MembershipPlans";
import RelatedCategories from "./RelatedCategories";
import OrderSummary from "./OrderSummary";
import Accordion from "./Accordion";
import {
  getProductsByTypeAndShoot,
  getProductsByTypeAndShootAndFinish,
} from "@/lib/mockData/portfolioData";
import { GoArrowRight } from "react-icons/go";
import FAQSection from "../home/FAQSection";
import Link from "next/link";

interface ProductConfigProps {
  category?: string;
  shootType?: string;
}

type AnimationPackageKey =
  | "30 SECS"
  | "1 MIN"
  | "15 SECS"
  | "30 SECS (Premium)"
  | "1 MIN (Premium)";

const ProductConfigurationPage = ({
  category = "CLOTHING",
  shootType = "FLATLAY",
}: ProductConfigProps) => {
  const [selectedFinish, setSelectedFinish] = useState("BASIC END FINISH");
  const [selectedShootType, setSelectedShootType] = useState(shootType);
  const [quantity, setQuantity] = useState(1);
  const [basePrice, setBasePrice] = useState(35000);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMembershipPlan, setSelectedMembershipPlan] = useState<
    string | null
  >(null);
  const [videoConfig, setVideoConfig] = useState<{
    videoType: string;
    animationPackage: AnimationPackageKey;
    videoStyle: string;
    videoQuantity: number;
  }>({
    videoType: "STANDARD",
    animationPackage: "30 SECS",
    videoStyle: "NORMAL",
    videoQuantity: 1,
  });

  useEffect(() => {
    if (selectedShootType === "MODEL") {
      setSelectedFinish("MEDIUM END FINISH");
    } else if (
      category === "CLOTHING" &&
      ["GHOST", "PINNED"].includes(selectedShootType)
    ) {
      setSelectedFinish("MEDIUM END FINISH");
    } else {
      setSelectedFinish("BASIC END FINISH");
    }
  }, [category, selectedShootType]);

  useEffect(() => {
    if (selectedShootType === "VIDEO") {
      const priceMap: Record<AnimationPackageKey, number> = {
        "30 SECS": 250000,
        "1 MIN": 350000,
        "15 SECS": 350000,
        "30 SECS (Premium)": 450000,
        "1 MIN (Premium)": 650000,
      };
      setBasePrice(priceMap[videoConfig.animationPackage] || 250000);
    } else {
      switch (selectedFinish) {
        case "BASIC END FINISH":
          setBasePrice(35000);
          break;
        case "MEDIUM END FINISH":
          setBasePrice(45000);
          break;
        case "HIGH END FINISH":
          setBasePrice(75000);
          break;
        case "PREMIUM END FINISH":
          setBasePrice(150000);
          break;
        default:
          setBasePrice(35000);
      }
    }
  }, [selectedFinish, selectedShootType, videoConfig.animationPackage]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedShootType, selectedFinish]);

  const filteredProducts = useMemo(() => {
    return getProductsByTypeAndShootAndFinish(
      category,
      selectedShootType,
      selectedFinish
    );
  }, [category, selectedShootType, selectedFinish]);

  const productMedia = useMemo(() => {
    if (filteredProducts.length === 0) {
      return [];
    }
    return filteredProducts.slice(0, 4).map((product) => ({
      url: product.image,
      type: selectedShootType === "VIDEO" ? "video" : "image",
    }));
  }, [filteredProducts, selectedShootType]);

  return (
    <div className="pt-[60px]">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-6">
          <motion.div
            className="flex items-center text-sm gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[#AAAAAA] font-medium">{category}</span>
            <span>
              <GoArrowRight />
            </span>
            <span className="text-[#1D1D1B] font-bold">{shootType}</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div>
            <div className="flex flex-row md:grid md:grid-cols-4 gap-3 md:gap-[14px] mb-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide items-center justify-center">
              {productMedia.length > 0
                ? productMedia.map((media, index) => (
                    <div
                      key={index}
                      className={`border flex-shrink-0 cursor-pointer transition-all duration-200 hover:border-gray-500 overflow-hidden snap-start ${
                        index === selectedImageIndex
                          ? "border-gray-800"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <div className="w-[110px] h-[154px] mx-auto md:w-[141px] md:h-[197px] relative bg-white flex items-center justify-center">
                        {media.type === "image" ? (
                          <Image
                            src={media.url}
                            alt={`Product thumbnail ${index + 1}`}
                            width={141}
                            height={197}
                            className="object-cover object-center"
                          />
                        ) : (
                          <video
                            src={media.url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover object-center"
                          />
                        )}
                      </div>
                    </div>
                  ))
                : Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="border flex-shrink-0 p-1 border-gray-200 snap-start"
                      >
                        <div className="w-[110px] h-[154px] md:w-[141px] md:h-[197px] bg-gray-200"></div>
                      </div>
                    ))}
            </div>

            <motion.div
              className="aspect-square bg-white relative"
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {productMedia.length > 0 &&
              selectedImageIndex < productMedia.length ? (
                productMedia[selectedImageIndex].type === "image" ? (
                  <Image
                    src={productMedia[selectedImageIndex].url}
                    alt={`${category} ${shootType} photography`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                ) : (
                  <video
                    src={productMedia[selectedImageIndex].url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No preview available
                </div>
              )}
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <span className="flex items-center justify-center w-[137px] h-[35px] py-[14px] px-[11px] rounded-full border border-[#1D1D1B] text-lg font-medium">
                  {selectedShootType}
                </span>
              </div>

              <h1 className="text-[38px] md:text-[52px] leading-[110%] font-bold mb-2">
                {category} <br /> PHOTOGRAPHY
              </h1>

              <p className="text-[#444444] mb-6 leading-[155%] text-sm md:text-lg">
                {selectedShootType === "FLATLAY"
                  ? "Flat lay photography captures clothing from a top-down view, laid flat on a surface."
                  : selectedShootType === "VIDEO"
                  ? "Bring your clothing to life with professional videos that showcase movement and style."
                  : "Showcase your clothing with professional photography."}
              </p>

              {selectedShootType !== "VIDEO" && (
                <div className="mb-7 border-t border-b border-[#D1D1D1] pt-5 md:pt-7 pb-6 md:pb-8">
                  <h2 className="font-semibold mb-2 leading-[155%] text-[26px] md:text-lg">
                    CHOOSE YOUR PREFERRED FINISH
                  </h2>
                  <p className="text-gray-600 mb-5 text-sm md:text-base">
                    Select the quality and style that best suits your brand's
                    needs.
                  </p>
                  <FinishSelector
                    selectedFinish={selectedFinish}
                    onSelectFinish={setSelectedFinish}
                    category={category}
                    shootType={selectedShootType}
                  />
                </div>
              )}

              <div className="mb-7">
                <h2 className="font-semibold mb-2 text-[26px] md:text-lg leading-[155%]">
                  SHOOT TYPE
                </h2>
                <p className="text-[#444444] mb-4 text-sm md:text-base">
                  Select the best way to showcase your product to match your
                  brand's needs.
                </p>
                <ShootTypeSelector
                  category={category}
                  selectedType={selectedShootType}
                  onSelectType={setSelectedShootType}
                  onVideoConfigChange={setVideoConfig}
                />
              </div>

              {selectedShootType !== "VIDEO" ? (
                <div className="mb-7">
                  <h2 className="font-semibold mb-2 text-[26px] md:text-lg leading-[155%]">
                    IMAGE QUANTITY
                  </h2>
                  <p className="text-[#444444] mb-4 text-sm md:text-base">
                    Input the number of shots you would like
                  </p>
                  <ImageQuantitySelector
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                </div>
              ) : null}

              <div className="mb-8">
                <h2 className="font-semibold mb-2 text-[26px] md:text-lg leading-[155%]">
                  MEMBERSHIP PLANS
                </h2>
                <p className="text-[#444444] mb-4 text-sm md:text-base">
                  Enjoy flexible options tailored to your needs. Save more with
                  higher volume and get exclusive perks with our membership
                  plans.
                </p>
                <MembershipPlans
                  selectedMembershipPlan={selectedMembershipPlan}
                  setSelectedMembershipPlan={setSelectedMembershipPlan}
                />
              </div>

              <OrderSummary
                basePrice={basePrice}
                quantity={
                  selectedShootType === "VIDEO"
                    ? videoConfig.videoQuantity
                    : quantity
                }
                selectedFinish={selectedFinish}
                selectedShootType={selectedShootType}
                category={category}
                selectedMembershipPlan={selectedMembershipPlan}
                videoConfig={videoConfig}
              />

              <div className="mt-8">
                <Accordion
                  title="WHAT'S INCLUDED IN THIS SERVICE?"
                  content={
                    <>
                      {selectedShootType === "VIDEO"
                        ? "High-quality video delivered in your chosen format and style."
                        : "Standard product photos delivered as high-resolution JPG files (300 DPI)."}
                      <br />
                      <br />
                      {selectedShootType === "VIDEO"
                        ? "Custom animation based on selected package."
                        : "Standard retouching included for every image."}
                      <br />
                      <br />
                      One round of revisions based on Belvaphilips’ feedback
                      process.
                      <br />
                      <br />
                      Turnaround starts the next business day after payment is
                      made.
                      <br />
                      <br />
                      Online-only collaboration; in-person attendance during
                      shoots is not available.
                    </>
                  }
                />
              </div>
              <div className="mt-8">
                <Accordion
                  title="WHAT IF I WANT TO BOOK MULTIPLE SERVICES?"
                  content={
                    <>
                      If you’d like to book multiple services — including
                      different shot types or finish types — you can specify
                      that in the project brief.
                      <br />
                      <br />
                      Just click the “Continue to Finalize” button to view and
                      complete the brief.
                    </>
                  }
                />
              </div>

              <div className="mt-5 flex flex-col md:flex-row justify-between md:items-center border-t border-gray-200 pt-4 gap-4">
                <div>
                  <h3 className="font-semibold leading-[155%] text-[26px] md:text-lg">
                    CONFUSED OR NEED ASSISTANCE?
                  </h3>
                  <p className="text-sm text-[#444444]">
                    Book a quick call with us
                  </p>
                </div>
                <Link
                  href="https://cal.com/belvaphilips-imagery"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="border border-[#1D1D1B] w-[126px] h-[38px] flex items-center justify-center cursor-pointer rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors">
                    BOOK A CALL
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-[128px] md:mt-[176px] mb-[61px] md:mb-[100px]">
          <div className="flex flex-col md:flex-row md:items-start">
            <h2 className="text-[38px] md:text-[64px] max-w-[290px] md:max-w-[614px] font-semibold mb-8 leading-[115%] tracking-tight md:tracking-[-3px] w-full">
              YOU MIGHT PREFER THESE
            </h2>
            <div className="hidden md:flex md:justify-end w-full mt-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="inline-flex items-center text-gray-800 hover:text-black cursor-pointer"
              >
                <Link
                  href="/portfolio"
                  className="flex items-center border-[0.5px] w-[287px] h-[55px] justify-center border-[#C9C9C9] gap-4"
                >
                  <span className="font-medium">VIEW ALL OUR SERVICES</span>
                  <svg
                    width="18"
                    height="15"
                    viewBox="0 0 18 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0306 0.219445L17.7806 6.96945C17.8504 7.0391 17.9057 7.12182 17.9434 7.21287C17.9812 7.30391 18.0006 7.40151 18.0006 7.50007C18.0006 7.59863 17.9812 7.69623 17.9434 7.78728C17.9057 7.87832 17.8504 7.96104 17.7806 8.0307L11.0306 14.7807C10.8899 14.9214 10.699 15.0005 10.5 15.0005C10.301 15.0005 10.1101 14.9214 9.96937 14.7807C9.82864 14.64 9.74958 14.4491 9.74958 14.2501C9.74958 14.051 9.82864 13.8602 9.96937 13.7194L15.4397 8.25007L0.75 8.25007C0.551087 8.25007 0.360322 8.17105 0.21967 8.0304C0.0790175 7.88975 -3.19159e-07 7.69898 -3.27854e-07 7.50007C-3.36548e-07 7.30116 0.0790174 7.11039 0.21967 6.96974C0.360322 6.82909 0.551087 6.75007 0.75 6.75007L15.4397 6.75007L9.96937 1.2807C9.82864 1.13996 9.74958 0.949093 9.74958 0.75007C9.74958 0.551047 9.82864 0.360176 9.96937 0.219445C10.1101 0.0787139 10.301 -0.000347588 10.5 -0.000347596C10.699 -0.000347605 10.8899 0.0787139 11.0306 0.219445Z"
                      fill="#1D1D1B"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>

          <RelatedCategories />

          <div className="flex md:hidden mt-6">
            <motion.div
              whileHover={{ x: 5 }}
              className="inline-flex items-center text-gray-800 hover:text-black cursor-pointer"
            >
              <Link
                href="/portfolio"
                className="flex items-center border-[0.5px] w-[287px] h-[55px] justify-center border-[#C9C9C9] gap-4"
              >
                <span className="font-medium">VIEW ALL OUR SERVICES</span>
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0306 0.219445L17.7806 6.96945C17.8504 7.0391 17.9057 7.12182 17.9434 7.21287C17.9812 7.30391 18.0006 7.40151 18.0006 7.50007C18.0006 7.59863 17.9812 7.69623 17.9434 7.78728C17.9057 7.87832 17.8504 7.96104 17.7806 8.0307L11.0306 14.7807C10.8899 14.9214 10.699 15.0005 10.5 15.0005C10.301 15.0005 10.1101 14.9214 9.96937 14.7807C9.82864 14.64 9.74958 14.4491 9.74958 14.2501C9.74958 14.051 9.82864 13.8602 9.96937 13.7194L15.4397 8.25007L0.75 8.25007C0.551087 8.25007 0.360322 8.17105 0.21967 8.0304C0.0790175 7.88975 -3.19159e-07 7.69898 -3.27854e-07 7.50007C-3.36548e-07 7.30116 0.0790174 7.11039 0.21967 6.96974C0.360322 6.82909 0.551087 6.75007 0.75 6.75007L15.4397 6.75007L9.96937 1.2807C9.82864 1.13996 9.74958 0.949093 9.74958 0.75007C9.74958 0.551047 9.82864 0.360176 9.96937 0.219445C10.1101 0.0787139 10.301 -0.000347588 10.5 -0.000347596C10.699 -0.000347605 10.8899 0.0787139 11.0306 0.219445Z"
                    fill="#1D1D1B"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>

        <FAQSection />
      </div>
    </div>
  );
};

export default ProductConfigurationPage;
