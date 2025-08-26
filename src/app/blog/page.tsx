import { Suspense } from "react";

import Spinner from "@/components/ui/Spinner";
import BlogContent from "@/components/blog/BlogContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Blog() {
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
        <BlogContent />
      </Suspense>
      <Footer />
    </>
  );
}
