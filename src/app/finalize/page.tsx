import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FinalizeProjectPage from "@/components/product/FinalizeProjectPage";
import Spinner from "@/components/ui/Spinner";
import { Suspense } from "react";

export default function FinalizePage() {
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
        <FinalizeProjectPage />
      </Suspense>
      <Footer />
    </>
  );
}
