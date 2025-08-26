"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductConfigurationPage from "@/components/product/ProductConfigurationPage";
import Spinner from "@/components/ui/Spinner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProductServicePage() {
  const params = useParams();
  const [category, setCategory] = useState<string>("");
  const [shootType, setShootType] = useState<string>("");

  useEffect(() => {
    if (params.id && Array.isArray(params.id) && params.id.length >= 2) {
      const formattedCategory = String(params.id[0]).toUpperCase();
      const formattedShootType = String(params.id[1]).toUpperCase();

      setCategory(formattedCategory);
      setShootType(formattedShootType);
    }
  }, [params]);

  if (!category || !shootType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <ProductConfigurationPage category={category} shootType={shootType} />
      <Footer />
    </>
  );
}
