"use client";

import { useState } from "react";
import { Input, Button, Card, CardBody, Divider } from "@nextui-org/react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    site_name: initialData.site_name || "Dookiee.s",
    line_oa: initialData.line_oa || "",
    phone: initialData.phone || "",
    facebook_url: initialData.facebook_url || "",
    instagram_url: initialData.instagram_url || "",
    tiktok_url: initialData.tiktok_url || "",
    seo_title: initialData.seo_title || "",
    seo_description: initialData.seo_description || "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ id: 1, ...formData, updated_at: new Date().toISOString() });

      if (error) throw error;
      toast.success("Settings saved!");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <Card>
        <CardBody className="gap-6 p-6">
          <div>
            <h3 className="font-bold text-lg mb-4 text-brand-primary">
              General Info
            </h3>
            <div className="grid gap-4">
              <Input
                label="Site Name"
                value={formData.site_name}
                onValueChange={(v) => handleChange("site_name", v)}
              />
              <Input
                label="Phone Number"
                value={formData.phone}
                onValueChange={(v) => handleChange("phone", v)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="font-bold text-lg mb-4 text-brand-primary">
              Contact & Social
            </h3>
            <div className="grid gap-4">
              <Input
                label="LINE OA ID"
                placeholder="@dookiee"
                value={formData.line_oa}
                description="Used for order links"
                onValueChange={(v) => handleChange("line_oa", v)}
              />
              <Input
                label="Facebook URL"
                value={formData.facebook_url}
                onValueChange={(v) => handleChange("facebook_url", v)}
              />
              <Input
                label="Instagram URL"
                value={formData.instagram_url}
                onValueChange={(v) => handleChange("instagram_url", v)}
              />
              <Input
                label="TikTok URL"
                value={formData.tiktok_url}
                onValueChange={(v) => handleChange("tiktok_url", v)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="font-bold text-lg mb-4 text-brand-primary">
              SEO Configuration
            </h3>
            <div className="grid gap-4">
              <Input
                label="SEO Title (Default)"
                value={formData.seo_title}
                onValueChange={(v) => handleChange("seo_title", v)}
              />
              <Input
                label="SEO Description"
                value={formData.seo_description}
                onValueChange={(v) => handleChange("seo_description", v)}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Button
        type="submit"
        color="primary"
        size="lg"
        className="font-bold shadow-soft"
        isLoading={loading}
      >
        Save Changes
      </Button>
    </form>
  );
}
