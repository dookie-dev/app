"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ShoppingBag,
  Image as ImageIcon,
  Star,
  Eye,
  DollarSign,
  Users,
  Package,
} from "lucide-react";
import { Spinner, Chip, Button } from "@nextui-org/react";
import Link from "next/link";
import { format } from "date-fns";
import { Order } from "@/types";

const statusColorMap: Record<
  string,
  "warning" | "success" | "primary" | "danger" | "default"
> = {
  pending: "warning",
  paid: "success",
  shipped: "primary",
  cancelled: "danger",
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalMenus: 0,
  });

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Parallel requests
      const [ordersRes, menusRes, customersRes, recentOrdersRes] =
        await Promise.all([
          supabase.from("orders").select("total_amount"),
          supabase.from("menus").select("id", { count: "exact" }),
          supabase.from("customers").select("id", { count: "exact" }),
          supabase
            .from("orders")
            .select(
              `
            *,
            customer:customers(name, phone)
          `,
            )
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

      const totalSales =
        ordersRes.data?.reduce(
          (acc, order) => acc + (order.total_amount || 0),
          0,
        ) || 0;
      const totalOrders = ordersRes.data?.length || 0;
      const totalMenus = menusRes.count || 0;
      const totalCustomers = customersRes.count || 0;

      setMetrics({
        totalSales,
        totalOrders,
        totalCustomers,
        totalMenus,
      });

      setRecentOrders((recentOrdersRes.data as unknown as Order[]) || []);
    } catch (e) {
      console.error("Error loading dashboard:", e);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Sales",
      value: `฿${metrics.totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      title: "Total Orders",
      value: metrics.totalOrders.toLocaleString(),
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Total Customers",
      value: metrics.totalCustomers.toLocaleString(),
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      title: "Active Menus",
      value: metrics.totalMenus.toLocaleString(),
      icon: ShoppingBag,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Spinner label="Loading Dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-800">
            Dashboard
          </h2>
          <p className="text-muted-foreground">
            Real-time overview of your store performance.
          </p>
        </div>
        <Button variant="flat" color="primary" onPress={fetchData} size="sm">
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md"
            >
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">Recent Orders</h3>
          <Link href="/admin/orders">
            <Button
              size="sm"
              variant="light"
              color="primary"
              endContent={<Eye size={16} />}
            >
              View All
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          {recentOrders.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3">Order Code</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-bold text-brand-primary hover:underline"
                      >
                        {order.order_code}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {order.customer?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {order.customer?.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      ฿{order.total_amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Chip
                        className="capitalize"
                        color={statusColorMap[order.status] || "default"}
                        size="sm"
                        variant="flat"
                      >
                        {order.status}
                      </Chip>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-500 text-sm">
                      {format(new Date(order.created_at), "dd MMM HH:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <Package size={48} className="mx-auto mb-4 opacity-20" />
              <p>No orders yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
