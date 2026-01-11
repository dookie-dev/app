"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const columns = [
  { name: "PRODUCT", uid: "name" },
  { name: "CATEGORY", uid: "category" },
  { name: "STATUS", uid: "status" },
  { name: "PRICE", uid: "price" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  available: "success",
  out_of_stock: "danger",
  hidden: "warning",
};

export default function MenuTable({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const { error } = await supabase.from("menus").delete().eq("id", id);
      if (error) throw error;

      toast.success("Menu item deleted");
      router.refresh();
    } catch (error: any) {
      console.error("Error deleting menu:", error);
      toast.error("Failed to delete menu");
    }
  };

  return (
    <Table aria-label="Menu Table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={initialData} emptyContent={"No menu items found"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              // Custom Cell Rendering
              if (columnKey === "name") {
                return (
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            No Img
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-gray-900">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          ID: {item.id.toString().slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </TableCell>
                );
              }
              if (columnKey === "status") {
                return (
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={statusColorMap[item.status]}
                      size="sm"
                      variant="flat"
                    >
                      {item.status.replace("_", " ")}
                    </Chip>
                  </TableCell>
                );
              }
              if (columnKey === "price") {
                return (
                  <TableCell>
                    <span className="font-medium">฿{item.price}</span>
                  </TableCell>
                );
              }
              if (columnKey === "actions") {
                return (
                  <TableCell>
                    <div className="relative flex items-center justify-center gap-2">
                      <Tooltip content="Edit menu">
                        <Link
                          href={`/admin/menu/${item.id}`}
                          className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        >
                          <Edit size={18} />
                        </Link>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete menu">
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="text-lg text-danger cursor-pointer active:opacity-50 outline-none"
                        >
                          <Trash2 size={18} />
                        </button>
                      </Tooltip>
                    </div>
                  </TableCell>
                );
              }
              // Default
              return (
                <TableCell>{(item as any)[columnKey as string]}</TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
