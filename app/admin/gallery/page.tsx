import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import Link from "next/link"; // Or use client component for upload modal
import GalleryGrid from "@/app/admin/gallery/_components/GalleryGrid";
import { createClient } from "@/lib/supabase/server";

export default async function GalleryPage() {
  const supabase = createClient();

  const { data: gallery, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-800">
            Gallery & Review Management
          </h2>
          <p className="text-muted-foreground">
            Manage your customer reviews and photo gallery.
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={18} />}
          className="font-bold text-white shadow-soft"
        >
          Add New Media
        </Button>
      </div>

      <GalleryGrid initialData={gallery || []} />
    </div>
  );
}
