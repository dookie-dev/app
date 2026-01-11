import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/app/admin/settings/_components/SettingsForm";

export default async function SettingsPage() {
  const supabase = createClient();

  // Fetch settings (Singleton id=1)
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          Site Settings
        </h2>
        <p className="text-muted-foreground">
          Manage global configuration for your website.
        </p>
      </div>

      <SettingsForm initialData={settings || {}} />
    </div>
  );
}
