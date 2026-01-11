import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Plus } from "lucide-react";
import MenuTable from "@/app/admin/menu/_components/MenuTable";
import { createClient } from "@/lib/supabase/server";

export default async function MenuPage() {
  const supabase = createClient();

  // Try to fetch real data
  const { data: menus, error } = await supabase
    .from("menus")
    .select("*")
    .order("created_at", { ascending: false });

  const displayData = menus || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-800">
            Menu Management
          </h2>
          <p className="text-muted-foreground">
            Manage your cookies, prices, and stock.
          </p>
        </div>
        <Button
          as={Link}
          href="/admin/menu/new"
          color="primary"
          startContent={<Plus size={18} />}
          className="font-bold text-white shadow-soft"
        >
          Add New Item
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-1">
        <MenuTable initialData={displayData} />
      </div>
    </div>
  );
}
