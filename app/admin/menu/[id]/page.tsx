import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import MenuForm from "@/app/admin/menu/_components/MenuForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditMenuPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  // Try fetch from DB with Gallery
  const { data: menu, error } = await supabase
    .from("menus")
    .select("*, gallery(*)")
    .eq("id", params.id)
    .single();

  if (!menu) {
    notFound();
  }

  const displayData = menu;
  const initialGallery = menu.gallery
    ? menu.gallery
        .filter((g: any) => g.type === "gallery")
        .map((g: any) => g.image_url)
    : [];

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
            Edit Product
          </h2>
          <p className="text-muted-foreground">
            {displayData?.name || "Loading..."}
          </p>
        </div>
      </div>

      <MenuForm initialData={displayData} initialGallery={initialGallery} />
    </div>
  );
}
