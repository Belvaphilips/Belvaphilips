import { Suspense } from "react";

import Spinner from "@/components/ui/Spinner";
import PortfolioContent from "@/components/portfolio/PortfolioContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Portfolio() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <Spinner size="lg" />
            </div>
          </div>
        }
      >
        <PortfolioContent />
      </Suspense>
      <Footer />
    </>
  );
}
