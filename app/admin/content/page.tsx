import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import ContentTable from "@/app/admin/content/_components/ContentTable";
import { createClient } from "@/lib/supabase/server";

export default async function ContentPage() {
  const supabase = createClient();

  const { data: contents } = await supabase
    .from("contents")
    .select("*")
    .order("section_key", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-800">
            Content Management
          </h2>
          <p className="text-muted-foreground">
            Manage dynamic text and banners for your site.
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={18} />}
          className="font-bold text-white shadow-soft"
        >
          Add Section
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-1">
        <ContentTable initialData={contents || []} />
      </div>
    </div>
  );
}
