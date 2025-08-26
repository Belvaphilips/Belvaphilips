"use client";
import Link from "next/link";
import Image from "next/image";
import { CiMapPin } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaBehance, FaPinterestP, FaXTwitter } from "react-icons/fa6";
import { Karla } from "next/font/google";
import { useState } from "react";
import { PiCaretDown, PiCaretUp } from "react-icons/pi";
import GetStartedModal from "../getStartedModal";

const karla = Karla({ subsets: ["latin"] });

const Footer = () => {
  const [openSections, setOpenSections] = useState({
    company: false,
    menu: false,
    categories: false,
    help: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-[#FEC845] py-11 relative overflow-hidden">
      <div className="container mx-auto px-4 pb-[66px]">
        <div className="border-b border-[#00000020]">
          <div className="flex lg:gap-[122px] lg:flex-row flex-col">
            {/* Company Info */}
            <div className="max-w-[294px] flex flex-col gap-6">
              <div className="flex items-start gap-2">
                <span>
                  <CiMapPin className="text-[#9B7824]" size={22} />
                </span>
                <p className="-mt-1 md:text-lg text-base font-medium">
                  Belvaphilips Imagery,
                  <br /> No 48, Adedoyin Street, Ogba.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <span>
                    <Image
                      src="/assets/images/Phone.svg"
                      width={22}
                      height={22}
                      alt="Phone"
                    />
                  </span>
                  <p className="md:text-lg text-base font-medium">
                    09021431136
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[10px]">
                <Link
                  href={"https://www.instagram.com/belvaphilips.imagery"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="w-[40px] h-[40px] flex items-center justify-center border border-black rounded-full">
                    <FaInstagram size={20} />
                  </span>
                </Link>
                <Link
                  href={"https://www.facebook.com/belvaphilipsstudios"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="w-[40px] h-[40px] flex items-center justify-center border border-black rounded-full">
                    <FaFacebookF size={20} />
                  </span>
                </Link>

                <Link
                  href={"https://x.com/belvaphilipsi?s=21"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="w-[40px] h-[40px] flex items-center justify-center border border-black rounded-full">
                    <FaXTwitter size={20} />
                  </span>
                </Link>
                <Link
                  href={"https://www.linkedin.com/company/belvaphilips/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="w-[40px] h-[40px] flex items-center justify-center border border-black rounded-full">
                    <FaLinkedinIn size={20} />
                  </span>
                </Link>
                <Link
                  href={"https://www.behance.net/belvaphimagery"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="w-[40px] h-[40px] flex items-center justify-center border border-black rounded-full">
                    <FaBehance />
                  </span>
                </Link>
                <Link
                  href={"https://pin.it/1J1Et2atc"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="w-[40px] h-[40px] flex items-center justify-center border border-black rounded-full">
                    <FaPinterestP />
                  </span>
                </Link>
              </div>
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer w-[162px] h-[47px] uppercase flex items-center justify-center bg-[#1D1D1B] rounded-full text-sm font-semibold text-white md:mb-0 mb-[58px]"
                >
                  get started
                </button>
              </div>
            </div>

            {/* Company Section */}
            <div className="text-lg">
              <h4
                className="font-semibold mb-4 uppercase text-[#B69035] cursor-pointer flex items-center gap-2"
                onClick={() => toggleSection("company")}
              >
                Company
                <span className="md:hidden block">
                  {openSections.company ? <PiCaretUp /> : <PiCaretDown />}
                </span>
              </h4>
              <div
                className={`overflow-hidden transition-all duration-300 md:hidden block  ${
                  openSections.company ? "max-h-96 mb-5" : "max-h-0"
                }`}
              >
                <ul className="space-y-4">
                  <li>
                    <Link href="/about" className="hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:underline whitespace-nowrap"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:underline">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:underline">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/team" className="hover:underline">
                      Team
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="md:block hidden ">
                <ul className="space-y-4">
                  <li>
                    <Link href="/about" className="hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:underline whitespace-nowrap"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:underline">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:underline">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/team" className="hover:underline">
                      Team
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Menu Section */}
            <div className="text-lg">
              <h4
                className="font-semibold mb-4 uppercase text-[#B69035] cursor-pointer flex items-center gap-2"
                onClick={() => toggleSection("menu")}
              >
                Menu
                <span className="md:hidden block">
                  {openSections.menu ? <PiCaretUp /> : <PiCaretDown />}
                </span>
              </h4>
              <div
                className={`overflow-hidden md:hidden block transition-all duration-300 ${
                  openSections.menu ? "max-h-96 mb-5" : "max-h-0"
                }`}
              >
                <ul className="space-y-4">
                  <li>
                    <Link href="/portfolio" className="hover:underline">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/how-it-works"
                      className="hover:underline whitespace-nowrap"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:underline">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing#membership-section"
                      className="hover:underline"
                    >
                      Membership
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="md:block hidden">
                <ul className="space-y-4">
                  <li>
                    <Link href="/portfolio" className="hover:underline">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/how-it-works"
                      className="hover:underline whitespace-nowrap"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:underline">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing#membership-section"
                      className="hover:underline"
                    >
                      Membership
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Categories Section */}
            <div className="text-lg">
              <h4
                className="font-semibold mb-4 uppercase text-[#B69035] cursor-pointer flex items-center gap-2"
                onClick={() => toggleSection("categories")}
              >
                Categories
                <span className="md:hidden block">
                  {openSections.categories ? <PiCaretUp /> : <PiCaretDown />}
                </span>
              </h4>
              <div
                className={`overflow-hidden md:hidden block transition-all duration-300 ${
                  openSections.categories ? "max-h-96 mb-5" : "max-h-0"
                }`}
              >
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/portfolio?tab=CLOTHING"
                      className="hover:underline"
                    >
                      Clothing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=BAGS"
                      className="hover:underline"
                    >
                      Bags
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=SHOES"
                      className="hover:underline"
                    >
                      Shoes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=BEAUTY"
                      className="hover:underline"
                    >
                      Beauty
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=JEWELY"
                      className="hover:underline"
                    >
                      Jewelry
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=DRINKS"
                      className="hover:underline"
                    >
                      Drinks
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="md:block hidden">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/portfolio?tab=CLOTHING"
                      className="hover:underline"
                    >
                      Clothing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=BAGS"
                      className="hover:underline"
                    >
                      Bags
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=SHOES"
                      className="hover:underline"
                    >
                      Shoes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=BEAUTY"
                      className="hover:underline"
                    >
                      Beauty
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=JEWELY"
                      className="hover:underline"
                    >
                      Jewelry
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio?tab=DRINKS"
                      className="hover:underline"
                    >
                      Drinks
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Help Section */}
            <div className="text-lg">
              <h4
                className="font-semibold mb-4 uppercase text-[#B69035] cursor-pointer flex items-center gap-2"
                onClick={() => toggleSection("help")}
              >
                Help
                <span className="md:hidden block">
                  {openSections.help ? <PiCaretUp /> : <PiCaretDown />}
                </span>
              </h4>
              <div
                className={`overflow-hidden md:hidden block transition-all duration-300 ${
                  openSections.help ? "max-h-96 mb-5" : "max-h-0"
                }`}
              >
                <ul className="space-y-4">
                  <li className="whitespace-nowrap">
                    <Link
                      href="/exclusivity-license"
                      className="hover:underline"
                    >
                      Exclusivity License
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-policy" className="hover:underline">
                      Shipping Policy
                    </Link>
                  </li>
                  <li className="whitespace-nowrap">
                    <Link href="/terms-conditions" className="hover:underline">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/product-returns" className="hover:underline">
                      Product Returns
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="md:block hidden">
                <ul className="space-y-4">
                  <li className="whitespace-nowrap">
                    <Link
                      href="/exclusivity-license"
                      className="hover:underline"
                    >
                      Exclusivity License
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-policy" className="hover:underline">
                      Shipping Policy
                    </Link>
                  </li>
                  <li className="whitespace-nowrap">
                    <Link href="/terms-conditions" className="hover:underline">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/product-returns" className="hover:underline">
                      Product Returns
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 pb-4 text-[#B08215] text-xs md:text-base">
            <p>
              © {new Date().getFullYear()} Belvaphilips Imagery. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="flex items-end justify-center translate-y-[38%]">
          <Image
            src={"/assets/images/footer logo.svg"}
            width={199.06}
            height={152.29}
            alt="belvaphilips imagery"
            className="relative bottom-[-20px]"
          />
          <span
            className={`${karla.className} text-[115.38px] md:flex items-center md:gap-[2.45px] hidden `}
          >
            <span className="font-black">BELVAPHILIPS</span>
            <span className="font-light">IMAGERY</span>
          </span>
        </div>
      </div>

      <GetStartedModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </footer>
  );
};

export default Footer;
