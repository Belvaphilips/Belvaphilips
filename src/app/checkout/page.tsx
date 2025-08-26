"use client";
import { useState, useEffect } from "react";

import SuccessModal from "@/components/checkout/SuccessModal";
import DeliverySpeedCard from "@/components/checkout/DeliverySpeedCard";
import OrderSummary from "@/components/checkout/OrderSummary";
import { GoArrowRight } from "react-icons/go";
import MembershipModal from "@/components/product/MembershipModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAppSelector } from "@/lib/redux/hooks";
import { createOrder } from "@/lib/api";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";

const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.25 8H12.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 4.25L12.75 8L9 11.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Main Checkout Page Component
const CheckoutPage = () => {
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [selectedDeliveryType, setSelectedDeliveryType] =
    useState<string>("STANDARD");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { userId, email } = useAppSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    try {
      const storedOrder = localStorage.getItem("finalizedOrder");
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        setOrderDetails(parsedOrder);
      } else {
        console.warn("No finalized order found");
      }
    } catch (error) {
      console.error("Error retrieving order details:", error);
    }
    setIsLoading(false);
  }, []);

  const handleStartProject = async () => {
    setIsSubmitting(true);
    const checkoutData = {
      ...orderDetails,
      deliveryType: selectedDeliveryType,
      checkoutDate: new Date().toISOString(),
    };

    localStorage.setItem("submittedProject", JSON.stringify(checkoutData));

    const summaryObject = {
      delivery_speed: selectedDeliveryType,
      details: orderDetails.details,
      finish_type: orderDetails.finish,
      membership_type: orderDetails.membershipPlan,
      product_description: orderDetails.projectDescription,
      product_name: orderDetails.category,
      quantity: orderDetails.quantity,
      shoot_type: orderDetails.shootType,
      shots: orderDetails.selectedShots,
      status: "quote_sent",
      user_id: userId,
    };
    const token = cookies.get("user_token");

    try {
      if (token) {
        setAuthToken(token);
      }
      const { data } = await createOrder(summaryObject);

      if (data) {
        // toast.success("Successfully saved order", {
        //   style: {
        //     border: "1px solid #1D1D1B",
        //     padding: "16px",
        //     color: "#1D1D1B",
        //     borderRadius: "6px",
        //   },
        //   iconTheme: {
        //     primary: "#008000",
        //     secondary: "#FFFAEE",
        //   },
        // });
        setIsSubmitting(false);
        setShowSuccessModal(true);
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message, {
        style: {
          border: "0.5px solid #1D1D1B",
          padding: "16px",
          color: "#1D1D1B",
          borderRadius: "6px",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
      setIsSubmitting(false);
      console.log("Error message:", message);
    }
  };

  const handleTrackStatus = () => {
    window.location.href = "/dashboard";
  };

  const handleStartNewProject = () => {
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading checkout...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="pt-[60px] bg-[#F5F5F5] min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm gap-1">
              {orderDetails.category && (
                <>
                  <span className="text-[#AAAAAA] font-medium">
                    {orderDetails.category || "CLOTHING"}
                  </span>

                  <span className="text-[#AAAAAA]">
                    <GoArrowRight />
                  </span>
                </>
              )}
              {orderDetails.shootType && (
                <>
                  <span className="text-[#AAAAAA] font-medium">
                    {orderDetails.shootType || "FLATLAY"}
                  </span>

                  <span className="text-[#AAAAAA]">
                    <GoArrowRight />
                  </span>
                </>
              )}
              <span className="text-[#AAAAAA] font-medium">FINALIZE</span>
              <span className="text-[#AAAAAA]">
                <GoArrowRight />
              </span>
              <span className="text-[#1D1D1B] font-bold">CHECKOUT</span>
            </div>
          </div>

          {/* Page Title */}
          <h1 className="md:text-5xl text-[38px] leading-[110%] font-bold mb-10">
            FINALIZE YOUR PROJECT
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left column - Checkout Details */}
            <div className="lg:col-span-1">
              {/* Delivery Speed */}
              <div className="mb-5">
                <h2 className="md:text-[28px] text-[26px] font-semibold mb-2">
                  IMAGE DELIVERY SPEED
                </h2>
                <p className="text-[#444444] mb-6 md:text-base text-sm">
                  Choose the delivery speed that best fits your timeline.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-[#D1D1D1] border-b pb-7">
                  <DeliverySpeedCard
                    title="STANDARD"
                    description="Delivered within 8 business days after we receive your products and payment."
                    selected={selectedDeliveryType === "STANDARD"}
                    onClick={() => setSelectedDeliveryType("STANDARD")}
                  />
                  <DeliverySpeedCard
                    title="RUSH"
                    description="Delivered within 4 business days after we receive your products and payment. This attracts additional fees."
                    selected={selectedDeliveryType === "RUSH"}
                    onClick={() => setSelectedDeliveryType("RUSH")}
                  />
                </div>
              </div>

              {/* Delivery Format */}
              <div className="mb-9">
                <h2 className="md:text-[28px] text-[26px] font-semibold mb-2">
                  IMAGE DELIVERY FORMAT
                </h2>
                <p className="text-[#1D1D1B] mb-4 md:text-base text-sm">
                  Standard product photos are delivered as high-resolution 300
                  DPI JPEGs, using the maximum quality setting at 3000×3000
                  pixels.
                </p>
                <p className="text-[#1D1D1B] md:text-base text-sm">
                  Depending on the product shape, excess white space may be
                  cropped, leaving the longest dimension at least 3000 pixels,
                  while the other dimension is adjusted to fit the product's
                  shape.
                </p>
              </div>

              {/* Start Project Button */}
              <button
                disabled={isSubmitting}
                className="w-full bg-[#1D1D1B] text-white font-bold h-[47px] font-semibold mb-10 flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer rounded-full"
                onClick={handleStartProject}
              >
                {isSubmitting ? "Submitting Order..." : "START PROJECT"}
              </button>
            </div>

            {/* Right column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                orderDetails={orderDetails}
                selectedDeliveryType={selectedDeliveryType}
                onUpgrade={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <SuccessModal
          open={showSuccessModal}
          onOpenChange={setShowSuccessModal}
          onTrackStatus={handleTrackStatus}
          onStartNewProject={handleStartNewProject}
        />

        <MembershipModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
