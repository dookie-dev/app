"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Pagination,
  Spinner,
  Input,
} from "@nextui-org/react";
import { Search, Pencil } from "lucide-react";
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;
  const supabase = createClient();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          customer:customers(name, phone)
        `,
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data as unknown as Order[]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.order_code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const pages = Math.ceil(filteredOrders.length / rowsPerPage);
  const items = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold font-serif text-brand-text">
          Orders
        </h1>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            className="w-full md:w-64"
            placeholder="Search Order Code..."
            startContent={<Search size={18} className="text-gray-400" />}
            value={searchQuery}
            onValueChange={(setQuery) => {
              setSearchQuery(setQuery);
              setPage(1);
            }}
          />
          <Button color="primary" variant="flat" onPress={fetchOrders}>
            Refresh
          </Button>
        </div>
      </div>

      <Table
        aria-label="Orders table"
        bottomContent={
          pages > 1 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn>ORDER CODE</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>CUSTOMER</TableColumn>
          <TableColumn>PHONE</TableColumn>
          <TableColumn>TOTAL</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody items={items} emptyContent="No orders found">
          {(item) => (
            <TableRow key={item.id}>
              <TableCell className="font-bold">{item.order_code}</TableCell>
              <TableCell>
                {item.created_at
                  ? format(new Date(item.created_at), "dd MMM yyyy HH:mm")
                  : "-"}
              </TableCell>
              <TableCell>{item.customer?.name || "Unknown"}</TableCell>
              <TableCell>{item.customer?.phone || "-"}</TableCell>
              <TableCell>฿{item.total_amount.toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={statusColorMap[item.status] || "default"}
                  size="sm"
                  variant="flat"
                >
                  {item.status}
                </Chip>
              </TableCell>
              <TableCell>
                <Link href={`/admin/orders/${item.id}`}>
                  <span className="text-lg text-brand-muted hover:text-brand-primary active:opacity-50 cursor-pointer">
                    <Pencil size={20} />
                  </span>
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
