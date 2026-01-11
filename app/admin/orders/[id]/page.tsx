"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardBody,
  Chip,
  Button,
  Select,
  SelectItem,
  Spinner,
  Input,
  Textarea,
} from "@nextui-org/react";
import { ArrowLeft, Printer, Save, Edit2, X } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Order } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Shipped", value: "shipped" },
  { label: "Cancelled", value: "cancelled" },
];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
  });
  const supabase = createClient();

  useEffect(() => {
    if (id) fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          customer:customers(*),
          address:addresses(*),
          items:order_items(*)
        `,
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order");
      } else {
        const orderData = data as any;
        setOrder(orderData);
        setEditData({
          customerName: orderData.customer?.name || "",
          customerPhone: orderData.customer?.phone || "",
          deliveryAddress: orderData.address?.address || "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      setUpdating(true);
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setOrder((prev) => (prev ? { ...prev, status: newStatus as any } : null));
      toast.success("Order status updated");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveDetails = async () => {
    if (!order) return;
    try {
      setUpdating(true);

      // Update Customer
      const { error: customerError } = await supabase
        .from("customers")
        .update({
          name: editData.customerName,
          phone: editData.customerPhone,
        })
        .eq("id", order.customer_id);

      if (customerError) throw customerError;

      // Update Address
      const { error: addressError } = await supabase
        .from("addresses")
        .update({
          address: editData.deliveryAddress,
        })
        .eq("id", order.address_id);

      if (addressError) throw addressError;

      // Update local state
      setOrder((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          customer: {
            ...prev.customer,
            name: editData.customerName,
            phone: editData.customerPhone,
          },
          address: { ...prev.address, address: editData.deliveryAddress },
        } as any;
      });

      setIsEditing(false);
      toast.success("Order details updated");
    } catch (error: any) {
      console.error("Error saving details:", error);
      toast.error(error.message || "Failed to save details");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!order) {
    return <div className="text-center py-20">Order not found</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Print Styles */}
      <style jsx global>{`
        @page {
          size: auto;
          margin: 0mm;
        }
        @media print {
          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }

          /* Hide everything first */
          body * {
            visibility: hidden;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Specifically show ONLY receipt container */
          .print-container,
          .print-container * {
            visibility: visible;
          }

          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 10mm 15mm;
            background: white;
            color: black !important;
            display: block !important;
          }

          .no-print {
            display: none !important;
          }

          .print-card {
            border: none !important;
            border-bottom: 1px dashed #000 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            margin-bottom: 15px !important;
            padding: 0 !important;
          }

          .print-card :global(.p-6) {
            padding: 10px 0 !important;
          }

          /* Force grid to single column and remove gaps for compact print */
          .print-container.grid {
            display: block !important;
          }
        }

        /* Prevent background on screen when not printing */
        @media screen {
          .print-container {
            display: contents;
          }
        }
      `}</style>

      <div className="flex items-center gap-4 mb-6 no-print">
        <Link
          href="/admin/orders"
          className="p-2 rounded-full hover:bg-gray-100 text-brand-muted"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-brand-text">
            Order {order.order_code}
          </h1>
          <p className="text-sm text-brand-muted">
            {format(new Date(order.created_at), "dd MMM yyyy HH:mm")}
          </p>
        </div>
        <div className="ml-auto flex gap-4">
          <Select
            aria-label="Update Status"
            placeholder="Update Status"
            selectedKeys={[order.status]}
            className="w-40"
            size="sm"
            variant="bordered"
            onChange={(e) => handleStatusChange(e.target.value)}
            isDisabled={updating}
          >
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </Select>
          <Button
            startContent={<Printer size={18} />}
            variant="flat"
            onPress={() => window.print()}
          >
            Print
          </Button>
          {!isEditing ? (
            <Button
              color="primary"
              variant="flat"
              startContent={<Edit2 size={18} />}
              onPress={() => setIsEditing(true)}
            >
              Edit Details
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                color="danger"
                variant="flat"
                onPress={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                startContent={<Save size={18} />}
                onPress={handleSaveDetails}
                isLoading={updating}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print-container">
        {/* Left Column: Items */}
        <div className="md:col-span-2 space-y-6">
          <div className="hidden print:block mb-8 text-center border-b pb-4">
            <h1 className="text-3xl font-serif font-bold mb-2">
              Dookiee.s Order Slip
            </h1>
            <p className="text-xl">
              Order Code: <strong>{order.order_code}</strong>
            </p>
            <p className="text-sm">
              {format(new Date(order.created_at), "dd/MM/yyyy HH:mm")}
            </p>
          </div>

          <Card className="shadow-soft print-card">
            <CardBody className="p-6">
              <h3 className="font-bold text-lg mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-brand-text">
                        {item.menu_name_snapshot}
                      </p>
                      <p className="text-sm text-brand-muted">
                        ฿{item.unit_price} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-brand-text">
                      ฿{item.subtotal}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-brand-primary">
                  ฿{order.total_amount.toLocaleString()}
                </span>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Customer Info */}
        <div className="space-y-6">
          <Card className="shadow-soft print-card">
            <CardBody className="p-6">
              <h3 className="font-bold text-lg mb-4">Customer Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-brand-muted uppercase font-bold mb-1 block">
                    Name
                  </label>
                  {isEditing ? (
                    <Input
                      size="sm"
                      value={editData.customerName}
                      onValueChange={(v) =>
                        setEditData({ ...editData, customerName: v })
                      }
                    />
                  ) : (
                    <p className="font-medium">{order.customer?.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-brand-muted uppercase font-bold mb-1 block">
                    Phone
                  </label>
                  {isEditing ? (
                    <Input
                      size="sm"
                      value={editData.customerPhone}
                      onValueChange={(v) =>
                        setEditData({ ...editData, customerPhone: v })
                      }
                    />
                  ) : (
                    <p className="font-medium text-brand-primary font-mono">
                      {order.customer?.phone}
                    </p>
                  )}
                </div>
                <div className="no-print">
                  <label className="text-xs text-brand-muted uppercase font-bold">
                    Total Spent (Lifetime)
                  </label>
                  <p className="font-medium text-sm">
                    ฿{order.customer?.total_spent?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-soft print-card">
            <CardBody className="p-6">
              <h3 className="font-bold text-lg mb-4">Delivery Address</h3>
              {isEditing ? (
                <Textarea
                  value={editData.deliveryAddress}
                  onValueChange={(v) =>
                    setEditData({ ...editData, deliveryAddress: v })
                  }
                />
              ) : (
                <p className="text-brand-text leading-relaxed whitespace-pre-wrap">
                  {order.address?.address}
                </p>
              )}
            </CardBody>
          </Card>

          <div className="hidden print:block mt-20 text-center border-t pt-8">
            <p className="font-serif italic text-lg opacity-50">
              Thank you for ordering with Dookiee.s!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
