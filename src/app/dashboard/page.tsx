"use client";

import React, { useEffect, useState } from "react";

// import OrderDetailsModal from "./OrderDetailsModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RequestTable from "@/components/dashboard/RequestTable";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import { getOrdersByUser } from "@/lib/api";
import { useAppSelector } from "@/lib/redux/hooks";

interface Order {
  created_at: string;
  updated_at: string;
  product_description: string;
  id: string;
  user_id: string;
  user_email: string;
  user_membership_status: string;
  product_name: string;
  shoot_type: string;
  finish_type: string;
  delivery_speed: string;
  status: string;
  membership_type: string;
  details: any;
  shots: string[];
  quantity: number;
}

const UserDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const { userId, email } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const token = cookies.get("user_token");

      if (token) {
        setAuthToken(token);
      }

      try {
        if (userId) {
          const { data } = await getOrdersByUser(userId);
          const responseData = data.data as any;

          setOrders(responseData || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <>
      <div className="container mx-auto sm:pt-[140px] py-[120px] px-4">
        <div>
          <DashboardHeader />
          <div className="sm:w-[146px] sm:h-[40px] w-[120px] h-[33px] flex items-center justify-center rounded-full bg-[#EEEEEE] uppercase font-semibold sm:text-[22px] text-lg text-[#1D1D1B]">
            Requests
          </div>
          <div className="bg-white sm:p-6 mt-8 max-w-full">
            <RequestTable orders={orders} isLoading={loading} />
          </div>
          {/* <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          /> */}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
