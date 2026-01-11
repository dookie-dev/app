import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import MenuForm from "@/app/admin/menu/_components/MenuForm";

export default function NewMenuPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/menu"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-800">
            Add New Product
          </h2>
        </div>
      </div>

      <MenuForm />
    </div>
  );
}
